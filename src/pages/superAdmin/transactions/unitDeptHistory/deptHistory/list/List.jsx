import React, { useContext } from "react";
import AppContext from "../../../../../../context/AppContext";

// Styles
import { Wrapper, Top } from "./List.Styles";

const List = () => {
  const { deptSummary, setByUnit } = useContext(AppContext);

  let SN = 0;
  let grandTotal = 0;
  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setByUnit(true)}>
            View Units Transaction History
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
        <table className="table table-striped caption-top text-center">
          <caption>Transaction History by Departments</caption>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Department</th>
              <th scope="col">No. of Produsts/Services sold</th>
              <th scope="col">Total Amount (₦)</th>
            </tr>
          </thead>
          <tbody>
            {deptSummary.map((item, i) => (
              <tr key={i}>
                <th scope="row">{(SN = SN + 1)}</th>
                <td>{item.department}</td>
                <td>{item.numberOfProducts}</td>
                <td value={(grandTotal = grandTotal + item.total)}>
                  {item.total.toLocaleString("en-US")}
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <th>Grand total:</th>
              <th>₦ {grandTotal.toLocaleString("en-US")}</th>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default List;
