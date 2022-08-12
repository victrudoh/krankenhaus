import React, { useContext } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";

// Styles
import { Wrapper, Top } from "./List.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const List = () => {
  const { loading, setLoading, invoiceCustomers, setSavedInvoice } =
    useContext(AppContext);

  let SN = 0;
  let totalPrice = 0;

  const getDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/transactions/${id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      console.log("response", response);
      if (response.status === 200) {
        success("Found payment");
        // show transaction details on screen
        setSavedInvoice({
          display: true,
          data: response.data.transaction,
          items: response.data.products,
        });
      }
    } catch (err) {
      error("Couldn't fetch details");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
            <table className="table table-striped caption-top text-center">
              <caption>Invoice History: Customers</caption>
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Payment date</th>
                  {/* <th scope="col">ID</th> */}
                  <th scope="col">Customer</th>
                  <th scope="col">Amount (₦)</th>
                  <th scope="col">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {invoiceCustomers.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{(SN = SN + 1)}</th>
                    <td>{item.createdAt.slice(0, 10)}</td>
                    {/* <td>{item.id}</td> */}
                    <td>
                      {item.firstName} {item.lastName}
                    </td>
                    <td value={(totalPrice = totalPrice + item.total)}>
                      {item.total.toLocaleString("en-US")}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <button onClick={() => getDetails(item.id)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  {/* <td></td> */}
                  <th>Total</th>
                  <th>₦ {totalPrice.toLocaleString("en-US")}</th>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default List;
