import React, { useContext } from "react";
import AppContext from "../../../../../../context/AppContext";

// Styles
import { Wrapper, Top } from "./ProductHistoryList.Styles";

const ProductHistoryList = ({ setIsCustomer }) => {
  const { setShowProductPage } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        <Top>
          {/* <button onClick={() => setShowProductPage(false)}> */}
          <button onClick={() => setIsCustomer(true)}>
            View Customer Transaction History
          </button>
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
        </Top>
        <table className="table table-striped caption-top">
          <caption>Transaction History: Products</caption>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Payment date</th>
              <th scope="col">Department</th>
              <th scope="col">Description</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>Pharmacy</td>
              <td>Actifed Tab</td>
              <td>1</td>
              <td>955.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2022-03-12 19:33:03</td>
              <td>Pharmacy</td>
              <td>Andrenaline Inj</td>
              <td>6</td>
              <td>150.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>2022-03-12 18:13:14</td>
              <td>Pharmacy</td>
              <td>Alclav Susp. 457Mg</td>
              <td>1</td>
              <td>1325.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>Pharmacy</td>
              <td>Actifed Tab</td>
              <td>1</td>
              <td>955.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2022-03-12 19:33:03</td>
              <td>Pharmacy</td>
              <td>Andrenaline Inj</td>
              <td>6</td>
              <td>150.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>2022-03-12 18:13:14</td>
              <td>Pharmacy</td>
              <td>Alclav Susp. 457Mg</td>
              <td>1</td>
              <td>1325.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>Pharmacy</td>
              <td>Actifed Tab</td>
              <td>1</td>
              <td>955.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2022-03-12 19:33:03</td>
              <td>Pharmacy</td>
              <td>Andrenaline Inj</td>
              <td>6</td>
              <td>150.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>2022-03-12 18:13:14</td>
              <td>Pharmacy</td>
              <td>Alclav Susp. 457Mg</td>
              <td>1</td>
              <td>1325.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>Pharmacy</td>
              <td>Actifed Tab</td>
              <td>1</td>
              <td>955.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2022-03-12 19:33:03</td>
              <td>Pharmacy</td>
              <td>Andrenaline Inj</td>
              <td>6</td>
              <td>150.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>2022-03-12 18:13:14</td>
              <td>Pharmacy</td>
              <td>Alclav Susp. 457Mg</td>
              <td>1</td>
              <td>1325.00</td>
              <td>paid</td>
            </tr>
          </tbody>
        </table>
        <div className="bottom">
          <div className="moveToRight">
            <div className="row">
              <h5>Total</h5>
              <h5>Grand total</h5>
            </div>
            <div className="row">
              <h5>6620.00</h5>
              <h5>6620.00</h5>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ProductHistoryList;
