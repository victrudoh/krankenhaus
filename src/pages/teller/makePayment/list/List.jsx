import React, { useContext, useState } from "react";
import AppContext from "../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";

//styles
import { Wrapper, Top } from "./List.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const List = () => {
  const { loading, setLoading, trackPayment } = useContext(AppContext);

  let SN = 0;
  let totalPrice = 0;

  const [status, setStatus] = useState({
    paid: false,
    status: "",
  });

  const updateStatus = async (e) => {
    e.preventDefault();
    console.log("🚀status", status);
    try {
      setLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.onrender.com/transactions/update?transactionId=${trackPayment.transaction.id}`,
        status,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success(response.data.message);
        // setTrackPayment({
        //   transaction: [...trackPayment.transaction, status: "paid" ],
        //   products: trackPayment.products,
        // });
        setStatus({
          ...status,
          paid: true,
        });
        // window.location.reload(false);
      }
    } catch (err) {
      error(err.message);
      console.log(err);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    console.log(e.target.value);
    setStatus(() => ({
      ...status,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        {trackPayment.products.length > 0 ? (
          <>
            <Top>
              <div className="pair">
                <label>Name: </label>
                <h4>
                  {trackPayment.transaction.firstName}{" "}
                  {trackPayment.transaction.lastName}
                </h4>
              </div>
              <form onSubmit={updateStatus}>
                <div className="pair">
                  <label>Status: </label>
                  {trackPayment.transaction.status === "paid" || status.paid ? (
                    <h4>{trackPayment.transaction.status}</h4>
                  ) : (
                    <>
                      <select
                        name="status"
                        id="status"
                        required
                        onChange={onchangeHandler}
                        defaultValue={trackPayment.transaction.status}
                      >
                        <option>{trackPayment.transaction.status}</option>
                        <option value="paid">paid</option>
                      </select>
                      <button type="submit">Update</button>
                    </>
                  )}
                </div>
              </form>
            </Top>
          </>
        ) : (
          ""
        )}
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table caption-top text-center">
            <caption>Track payment</caption>
            <thead>
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Description</th>
                <th scope="col">Qty</th>
                <th scope="col">Price (₦)</th>
              </tr>
            </thead>
            <tbody>
              {trackPayment.products.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{(SN = SN + 1)}</th>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td value={(totalPrice = totalPrice + item.price)}>
                    {item.price.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
              {trackPayment.products.length > 0 ? (
                <>
                  <tr>
                    <td></td>
                    <td></td>
                    <th>Total:</th>
                    <td>₦ {totalPrice.toLocaleString("en-US")}</td>
                  </tr>
                </>
              ) : (
                ""
              )}
            </tbody>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default List;
