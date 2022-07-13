import React, { useContext, useEffect } from "react";
import AppContext from "../../../../context/AppContext";

//styles
import { Wrapper } from "./List.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const List = () => {
  const { loading, setLoading } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table caption-top">
            <caption>Track payment</caption>
            <thead>
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Payment Date</th>
                <th scope="col">Department</th>
                <th scope="col">Description</th>
                <th scope="col">Qty</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2022-03-12 17:53:49</td>
                <td>Pharmacy</td>
                <td>Abidec Syr</td>
                <td>1</td>
                <td>955.00</td>
                <td>Paid</td>
              </tr>
              {/* {invoiceList.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{(SN = SN + 1)}</th>
                  <td>{item.department.name}</td>
                  <td>{item.department.publish === true ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => deleteHandler(i)}>Delete</button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default List;
