import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper } from "./DeptList.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const DeptList = ({ setIsEditing }) => {
  const { loading, departments, setEditDeptId, setSavedDeptId } =
    useContext(AppContext);

  let SN = 0;
  let Navigate = useNavigate();

  const editHandler = (id) => {
    setIsEditing(true);
    setEditDeptId(id);
  };

  const gotoPrivilegeHandler = (id) => {
    setSavedDeptId(id);
    Navigate("/superadmin/deptprivilege");
  };

  return (
    <>
      <Wrapper>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table caption-top">
            <caption>List of departments</caption>
            <thead>
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Department</th>
                <th scope="col">Publish</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{(SN = SN + 1)}</th>
                  <td>{item.department.name}</td>
                  <td>{item.department.publish === true ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => editHandler(i)}>
                      Edit department
                    </button>
                    <button
                      className="mx-3"
                      onClick={() => gotoPrivilegeHandler(i)}
                    >
                      Teller privileges
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default DeptList;
