import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// styles
import { Wrapper } from "./UnitList.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const UnitList = () => {
  const { loading, pharmacyUnits, setEditInventoryUnit } =
    useContext(AppContext);

  let SN = 0;

  const editHandler = (item) => {
    setEditInventoryUnit({
      isEditingUnit: true,
      unit: item,
      deptName: "Pharmacy",
    });
    // collect user ID and pass it to the edit page, use state to carry the ID or something
  };

  const sendProductHandler = (e) => {};

  return (
    <>
      <Wrapper>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Unit</th>
                {/* <th scope="col">Account</th> */}
                <th scope="col">Publish</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {pharmacyUnits.length < 1 ? (
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>No Department to show</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            ) : (
              <>
                {pharmacyUnits.map((item, i) => (
                  <tbody key={i}>
                    <>
                      <tr className="" key={i}>
                        <td>{(SN = SN + 1)}</td>
                        <td>{item.name}</td>
                        {/* <td>{item.account}</td> */}
                        <td>{item.publish === true ? "Yes" : "No"}</td>
                        <td>
                          <button onClick={() => sendProductHandler(item)}>
                            Send Products
                          </button>
                          <button onClick={() => editHandler(item)}>
                            Edit Unit
                          </button>
                        </td>
                      </tr>
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
