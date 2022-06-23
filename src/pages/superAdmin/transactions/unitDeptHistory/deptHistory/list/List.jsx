import React from "react";

// Styles
import { Wrapper, Top } from "./List.Styles";

const List = ({ setByUnit }) => {
  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setByUnit(true)}>
            View Units Transaction History
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
          <caption>Transaction History: Departments</caption>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Department</th>
              <th scope="col">No. of Produsts/Services sold</th>
              <th scope="col">Total Amount (₦)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Pharmacy</td>
              <td>6</td>
              <td>1315.00</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Pharmacy</td>
              <td>6</td>
              <td>1315.00</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Pharmacy</td>
              <td>6</td>
              <td>1315.00</td>
            </tr>
          </tbody>
        </table>
        <div className="bottom">
          <div className="moveToRight">
            <div className="row">
              <h5>Grand total</h5>
            </div>
            <div className="row">
              <h5>1315.00</h5>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default List;
