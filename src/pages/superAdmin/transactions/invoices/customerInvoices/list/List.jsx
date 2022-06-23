import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Styles
import { Wrapper, Top } from "./List.Styles";

const List = ({ setIsCustomer }) => {
  const navigate = useNavigate();

  const viewDetailsHandler = () => {
    navigate("/superadmin/viewtrxdetails");
  };
  return (
    <>
      <Wrapper>
        <Top>
          {/* <NavLink exact to="/superadmin/userlogs">
            Product Transaction History
          </NavLink> */}
          <button onClick={() => setIsCustomer(false)}>
            View Product Invoice History
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
          <caption>Invoice History: Customers</caption>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Invoice date</th>
              <th scope="col">Payment date</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Invoice by</th>
              <th scope="col">Paid in by</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>2022-03-12 17:53:49</td>
              <td>Kim Sadiq</td>
              <td>Tes Test</td>
              <td>Bank Bank</td>
              <td>1315.00</td>
              <td>paid</td>
              <td>
                <button onClick={viewDetailsHandler}>Details</button>
              </td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>2022-03-12 17:53:49</td>
              <td>Kim Sadiq</td>
              <td>Tes Test</td>
              <td>Bank Bank</td>
              <td>1315.00</td>
              <td>paid</td>
              <td>
                <button onClick={viewDetailsHandler}>Details</button>
              </td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>2022-03-12 17:53:49</td>
              <td>Kim Sadiq</td>
              <td>Tes Test</td>
              <td>Bank Bank</td>
              <td>1315.00</td>
              <td>paid</td>
              <td>
                <button onClick={viewDetailsHandler}>Details</button>
              </td>
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

export default List;
