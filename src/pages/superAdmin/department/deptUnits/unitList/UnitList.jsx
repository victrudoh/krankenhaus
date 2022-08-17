import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../../../context/AppContext";
import { Wrapper } from "./UnitList.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const UnitList = () => {
  const { loading, departments, setSavedDeptName, setEditUnit } =
    useContext(AppContext);

  const navigate = useNavigate();
  const editHandler = (unitId, deptName) => {
    setEditUnit({
      isEditingUnit: true,
      unitId: unitId,
      deptName: deptName,
    });
    // collect user ID and pass it to the edit page, use state to carry the ID or something
  };

  const viewHandler = (name) => {
    // collect name and navigate to required page
    setSavedDeptName(name);
    navigate("/superadmin/viewunit");
  };

  return (
    <>
      <Wrapper>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">Department</th>
                <th scope="col">Units</th>
                <th scope="col">Publish</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {departments.length < 1 ? (
              <tbody>
                <tr>
                  <td></td>
                  <td colSpan={2}>No Department to show</td>
                  <td></td>
                </tr>
              </tbody>
            ) : (
              <>
                {departments.map((item, i) => (
                  <tbody key={i}>
                    <>
                      <tr className="bg-secondary bg-gradient text-white">
                        <td className="fw-bold">{item.department.name}</td>
                        <td></td>
                        <td></td>
                        <td>
                          <button
                            onClick={() => viewHandler(item.department.name)}
                          >
                            View units products
                          </button>
                        </td>
                      </tr>
                      {item.units.map((unit, i) => (
                        <tr key={i}>
                          <>
                            <td></td>
                            <td>{unit.name}</td>
                            <td>{unit.publish === false ? "No" : "Yes"}</td>
                            <td>
                              <button
                                onClick={() =>
                                  editHandler(unit.id, item.department.name)
                                }
                              >
                                Edit unit
                              </button>
                            </td>
                          </>
                        </tr>
                      ))}
                    </>
                  </tbody>
                ))}
              </>
            )}
            <></>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default UnitList;
