import React, { useContext } from "react";
import AppContext from "../../../../../../context/AppContext";
import { success, error } from "../../../../../../helpers/Alert";
import axios from "axios";

// Styles
import { Wrapper, Top } from "./ProductHistoryList.Styles";

// components
import { CircleSpinner } from "../../../../../../components/circleSpinner/CircleSpinner.Styles";

const ProductHistoryList = ({ setIsCustomer }) => {
  const {
    setDisplayCustomer,
    loading,
    setLoading,
    transactionsByProds,
    setSavedInvoice,
  } = useContext(AppContext);
  console.log(
    "🚀 ~ file: ProductHistoryList.jsx ~ line 12 ~ ProductHistoryList ~ transactionsByProds",
    transactionsByProds
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
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setDisplayCustomer(true)}>
            View Customer Transaction History
          </button>
        </Top>
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
            <table className="table table-striped caption-top text-center">
              <caption>Transaction History: Products</caption>
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Payment date</th>
                  <th scope="col">Department</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price (₦)</th>
                </tr>
              </thead>
              <tbody>
                {transactionsByProds.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{(SN = SN + 1)}</th>
                    <td>{item.date}</td>
                    <td>{item.department}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td value={(totalPrice = totalPrice + item.price)}>
                      {item.price.toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">2</th>
                  <td>2022-03-12 19:33:03</td>
                  <td>Pharmacy</td>
                  <td>Andrenaline Inj</td>
                  <td>6</td>
                  <td>150.00</td>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                  <th colSpan={2}>₦ {totalPrice.toLocaleString("en-US")}</th>
                </tr>
              </tbody>
            </table>
            {/* <div className="bottom">
              <div className="moveToRight">
                <div className="row">
                  <h5>Total</h5>
                  <h5>Grand total</h5>
                </div>
                <div className="row">
                  <h5>₦ {totalPrice.toLocaleString("en-US")}</h5>
                  <h5>₦ {totalPrice.toLocaleString("en-US")}</h5>
                </div>
              </div>
            </div> */}
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ProductHistoryList;
