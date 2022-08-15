import React, { useContext } from "react";
import AppContext from "../../../../../../context/AppContext";

// Styles
import { Wrapper, Top } from "./ProductHistoryList.Styles";

// components
import { CircleSpinner } from "../../../../../../components/circleSpinner/CircleSpinner.Styles";

const ProductHistoryList = ({ setIsCustomer }) => {
  const { setDisplayCustomer, loading, transactionsByProds } =
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
          {/* <div className="pair">
            <form>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search record"
              />
              <button type="submit">Search</button>
            </form>
          </div> */}
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
                  {/* <th scope="col">Status</th> */}
                </tr>
              </thead>
              <tbody>
                {transactionsByProds.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{(SN = SN + 1)}</th>
                    <td>2022-03-12 17:53:49</td>
                    <td>{item.department}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td value={(totalPrice = totalPrice + item.total)}>
                      {item.total.toLocaleString("en-US")}
                    </td>
                    <td>{item.status}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">2</th>
                  <td>2022-03-12 19:33:03</td>
                  <td>Pharmacy</td>
                  <td>Andrenaline Inj</td>
                  <td>6</td>
                  <td>150.00</td>
                  {/* <td>paid</td> */}
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                  {/* <th></th> */}
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
