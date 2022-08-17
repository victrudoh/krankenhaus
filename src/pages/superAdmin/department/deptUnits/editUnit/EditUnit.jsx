import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "../../../../../context/AppContext";
import { success, error } from "../../../../../helpers/Alert";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./EditUnit.Styles";

const EditUnit = () => {
  const { loading, setLoading, editUnit, setEditUnit, getDepartments } =
    useContext(AppContext);

  const [foundUnit, setFoundUnit] = useState({});
  const [updateUnit, setUpdateUnit] = useState({
    name: "",
    publish: "",
  });

  const fetchUnits = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/departments/units?name=${editUnit.deptName}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const matchFound = response.data.units.filter(
        (unit) => unit.id === editUnit.unitId
      );
      setFoundUnit(matchFound[0]);
    } catch (err) {
      err("Couldn't fetch units");
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.herokuapp.com/departments/units/edit?id=${foundUnit.id}`,
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
        success("Updated user successfully");
        setEditUnit({
          isEditingUnit: false,
          unitId: "",
          deptName: "",
        });
        getDepartments();
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
    setEditUnit({
      isEditingUnit: false,
      unitId: "",
      deptName: "",
    });
  };

  useEffect(() => {
    fetchUnits();
  }, []);

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
                <h4>{editUnit.deptName}</h4>
              </div>
              <div className="pair">
                <label>Unit:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Unit name"
                  onChange={onchangeHandler}
                  defaultValue={foundUnit.name}
                />
              </div>
              <div className="pair">
                <label>Publish:</label>
                <select
                  name="publish"
                  id="publish"
                  onChange={onchangeHandler}
                  defaultValue={foundUnit.publish}
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
