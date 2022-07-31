import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../../../context/AppContext";
import { Wrapper } from "./UnitList.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const UnitList = ({ setIsEditing }) => {
  const { loading, departments, setSavedDeptName, getDepartments } =
    useContext(AppContext);
  let SN = 0;

  const navigate = useNavigate();
  const editHandler = () => {
    setIsEditing(true);
    // collect user ID and pass it to the edit page, use state to carry the ID or something
  };

  const viewHandler = (name) => {
    // collect name and navigate to required page
    setSavedDeptName(name);
    navigate("/superadmin/viewunit");
  };

  // useEffect(() => {
  //   getDepartments();
  // }, []);

  return (
    <>
      <Wrapper>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Department</th>
                <th scope="col">Units</th>
                <th scope="col">Publish</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {departments.map((item, i) => (
              <tbody key={i}>
                <>
                  <tr className="bg-secondary bg-gradient text-white">
                    <td className="fw-bold">{item.department.name}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <button onClick={() => viewHandler(item.department.name)}>
                        View units products
                      </button>
                    </td>
                  </tr>
                  <tr>
                    {item.units.map((unit, i) => (
                      <>
                        <td key={i}></td>
                        <td>{unit.name}</td>
                        <td>{unit.publish === false ? "No" : "Yes"}</td>
                        <td>
                          <button onClick={editHandler}>Edit unit</button>
                        </td>
                      </>
                    ))}
                  </tr>
                </>
              </tbody>
            ))}
            <></>

            {/* <>
            <tr>
              <td>A & E</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td className="d-flex flex-column">
                <td className="mb-3">1. A&E</td>
                <td>2. A&E</td>
              </td>
              <td className="d-flex flex-column">
                <td className="mb-3">Yes</td>
                <td>Yes</td>
              </td>
              <td className="d-flex flex-column">
                <td className="mb-3">
                  <button>View</button>
                  <button className="mx-3" onClick={editHandler}>
                    Edit
                  </button>
                </td>
                <td>
                  <button>View</button>
                  <button className="mx-3" onClick={editHandler}>
                    Edit
                  </button>
                </td>
              </td>
            </tr>
          </> */}
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default UnitList;
