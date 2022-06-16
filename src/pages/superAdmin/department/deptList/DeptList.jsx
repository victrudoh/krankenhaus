import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import { Wrapper } from "./DeptList.Styles";

const DeptList = ({ setIsEditing }) => {
  const editHandler = () => {
    setIsEditing(true);
    // collect user ID and pass it to the edit page, use state to carry the ID or something
  };

  const gotoPrivilegeHandler = () => {
    // Navigate("/superadmin/deptprivilege");
  };

  return (
    <>
      <Wrapper>
        <table className="table caption-top">
          {/* <caption>List of departments</caption> */}
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Department</th>
              <th scope="col">Publish</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Admin</td>
              <td>Yes</td>
              <td>
                <button onClick={editHandler}>Edit department</button>
                <NavLink exact to="/superadmin/deptprivilege">
                  <button className="mx-3" onClick={gotoPrivilegeHandler}>
                    Teller privileges
                  </button>
                </NavLink>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Audit</td>
              <td>No</td>
              <td>
                <button onClick={editHandler}>Edit department</button>
                <NavLink exact to="/superadmin/deptprivilege">
                  <button className="mx-3" onClick={gotoPrivilegeHandler}>
                    Teller privileges
                  </button>
                </NavLink>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Bank</td>
              <td>No</td>
              <td>
                <button onClick={editHandler}>Edit department</button>
                <NavLink exact to="/superadmin/deptprivilege">
                  <button className="mx-3" onClick={gotoPrivilegeHandler}>
                    Teller privileges
                  </button>
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default DeptList;
