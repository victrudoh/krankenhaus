import React, { useContext } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";

// Styles
import { Wrapper, Top } from "./List.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const List = () => {
  const { loading, setLoading, invoiceProducts, setSavedInvoice } =
    useContext(AppContext);
  console.log(
    "🚀 ~ file: List.jsx ~ line 14 ~ List ~ invoiceProducts",
    invoiceProducts
  );

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
        {/* <Top>
          <div></div>
          <div className="pair">
            <form>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search record"
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div></div>
        </Top> */}
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
            <table className="table table-striped caption-top text-center">
              <caption>Transaction History: Products</caption>
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price (₦)</th>
                </tr>
              </thead>
              <tbody>
                {invoiceProducts.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{(SN = SN + 1)}</th>
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td value={(totalPrice = totalPrice + item.price)}>
                      {item.price.toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th>Total</th>
                  <th>₦ {totalPrice.toLocaleString("en-US")}</th>
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
