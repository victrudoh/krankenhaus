import React, { useContext } from "react";
import AppContext from "../../../../../context/AppContext";

// Styles
import { Wrapper } from "./List.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const List = () => {
  const { loading, invoiceProducts } = useContext(AppContext);

  let SN = 0;
  let totalPrice = 0;

  return (
    <>
      <Wrapper>
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
                  <th scope="col">Amount (₦)</th>
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
                {invoiceProducts.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default List;
