import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

//styles
import { Wrapper, Top } from "./List.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const List = () => {
  const { loading, trackPayment } = useContext(AppContext);

  let SN = 0;
  let totalPrice = 0;

  return (
    <>
      <Wrapper>
        <Top>
          <div className="pair">
            <label>Name: </label>
            <h4>
              {trackPayment.transaction.firstName}{" "}
              {trackPayment.transaction.lastName}
            </h4>
          </div>
          <div className="pair">
            <label>Status: </label>
            <h4>{trackPayment.transaction.status}</h4>
          </div>
        </Top>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table caption-top">
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
                    {item.price}
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <th>Total:</th>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default List;
