import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppContext from "../../../../../context/AppContext";

// styles
import { Wrapper, Top } from "./List.Styles";

const List = ({ setIsCustomer }) => {
  const { transactions } = useContext(AppContext);
  console.log("transactions", transactions);
  const navigate = useNavigate();

  const viewDetailsHandler = () => {
    navigate("/superadmin/viewtrxdetails");
  };

  return (
    <>
      <Wrapper>
        <Top>
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
        </Top>
        <table className="table table-striped caption-top">
          <caption>End of day summary</caption>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Payment date</th>
              <th scope="col">Name</th>
              <th scope="col">Teller</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>Kim Sadiq</td>
              <td>Bank Bank</td>
              <td>1315.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>Kim Sadiq</td>
              <td>Bank Bank</td>
              <td>1315.00</td>
              <td>paid</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>2022-03-12 17:53:49</td>
              <td>Kim Sadiq</td>
              <td>Bank Bank</td>
              <td>1315.00</td>
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

export default List;
