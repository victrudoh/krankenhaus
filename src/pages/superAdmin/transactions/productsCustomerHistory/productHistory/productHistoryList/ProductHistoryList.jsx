import React, { useContext } from "react";
import AppContext from "../../../../../../context/AppContext";

// Styles
import { Wrapper, Top } from "./ProductHistoryList.Styles";

// components
import { CircleSpinner } from "../../../../../../components/circleSpinner/CircleSpinner.Styles";

const ProductHistoryList = ({ setIsCustomer }) => {
  const { setDisplayCustomer, leftPanelLoading, transactionsByProds } =
    useContext(AppContext);

  let SN = 0;
  let totalPrice = 0;

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setDisplayCustomer(true)}>
            View Customer Transaction History
          </button>
        </Top>

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
              <th></th>
              <th></th>
              <th></th>
              <th>Total</th>
              <th colSpan={2}>₦ {totalPrice.toLocaleString("en-US")}</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>{leftPanelLoading && <CircleSpinner />}</th>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default ProductHistoryList;
