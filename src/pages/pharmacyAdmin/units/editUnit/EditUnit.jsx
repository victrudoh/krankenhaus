import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "../../../../context/AppContext";
import { success, error, info } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// styles
import { Wrapper, Content } from "./EditUnit.Styles";

const EditUnit = () => {
  const {
    loading,
    setLoading,
    getDepartments,
    getPharmacyUnits,
    editInventoryUnit,
    setEditInventoryUnit,
  } = useContext(AppContext);

  const [updateUnit, setUpdateUnit] = useState({
    name: "",
    // account: "",
    publish: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.herokuapp.com/departments/units/edit?id=${editInventoryUnit.unit.id}`,
        updateUnit,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success("Updated unit successfully");
        setEditInventoryUnit({
          isEditingUnit: false,
          unit: {},
          deptName: "",
        });
        getDepartments();
        getPharmacyUnits();
        setLoading(false);
      }
    } catch (err) {
      error("Psych! can't update unit");
      console.log(err);
      setLoading(false);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setUpdateUnit(() => ({
      ...updateUnit,
      [e.target.name]: e.target.value,
    }));
  };

  const cancelEditHandler = () => {
    setEditInventoryUnit({
      isEditingUnit: false,
      unit: {},
      deptName: "",
    });
  };

  return (
    <Wrapper>
      <h5>Edit Unit</h5>
      <Content>
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
            <form onSubmit={submit}>
              <div className="pair">
                <label>Department:</label>
                <h4>{editInventoryUnit.deptName}</h4>
              </div>
              <div className="pair">
                <label>Unit:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Unit name"
                  onChange={onchangeHandler}
                  defaultValue={editInventoryUnit.unit.name}
                />
              </div>
              {/* <div className="pair">
                <label>Account:</label>
                <input
                  type="text"
                  name="account"
                  id="account"
                  placeholder="Account Details"
                  onChange={onchangeHandler}
                  defaultValue={editInventoryUnit.unit.account}
                />
              </div> */}
              <div className="pair">
                <label>Publish:</label>
                <select
                  name="publish"
                  id="publish"
                  onChange={onchangeHandler}
                  defaultValue={editInventoryUnit.unit.publish}
                >
                  <option>Publish</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <button type="submit">Update unit</button>
              <button className="mx-3" onClick={cancelEditHandler}>
                Cancel
              </button>
            </form>
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default EditUnit;
