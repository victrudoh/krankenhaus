import React from "react";

// Styles
import { Wrapper } from "./PrivilegeList.Styles";

const PrivilegeList = () => {
  const deleteHandler = () => {
    // delete the privilege
  };

  return (
    <>
      <Wrapper>
        <table className="table caption-top">
          <caption>
            All Users from <b>Admin department</b> have access to the following
            product categories
          </caption>
          <thead>
            {/* <tr>
              <th scope="col">S/N</th>
              <th scope="col">Department</th>
              <th scope="col">Publish</th>
              <th scope="col">Actions</th>
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>FMC administration</td>
              <td>
                <button onClick={deleteHandler}>Delete</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Health information</td>
              <td>
                <button onClick={deleteHandler}>Delete</button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Laboratory</td>
              <td>
                <button onClick={deleteHandler}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default PrivilegeList;
