import React, { useContext, useState } from "react";
import axios from "axios";
import AppContext from "../../../../../context/AppContext";
import { success, error } from "../../../../../helpers/Alert";

// styles
import { Wrapper, Content } from "./AddUnit.Styles";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const AddUnit = () => {
  const { loading, setLoading, departments, getDepartments } =
    useContext(AppContext);

  const [newUnit, setNewUnit] = useState({
    department: "",
    name: "",
    publish: "",
  });

  const addunit = async (e) => {
    e.preventDefault();
    console.log("newUnit", newUnit);
    try {
      setLoading(true);
      const response = await axios.post(
        `https://hospital-ms-api.herokuapp.com/departments/unit/new?departmentId=${newUnit.department}`,
        newUnit,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(
        "🚀 ~ file: AddUnit.jsx ~ line 34 ~ addunit ~ response",
        response
      );
      setLoading(false);
      if (response.status === 200) {
        success("Created new department successfully");
        getDepartments();
        // setAddedDept(response.status);
      }
    } catch (err) {
      error("Psych! Couldn't add unit");
      console.log(err);
      setLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewUnit(() => ({
      ...newUnit,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <h5>Add Unit</h5>
      <Content>
        {loading ? (
          <>
            <CircleSpinner />
          </>
        ) : (
          <>
            <form onSubmit={addunit}>
              <div className="pair">
                <label>Department:</label>
                <select
                  name="department"
                  id="department"
                  onChange={onchangeHandler}
                  defaultValue={newUnit.department}
                >
                  <option>Select department</option>
                  {departments.map((item, i) => (
                    <option key={i} value={item.department.id}>
                      {item.department.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pair">
                <label>Unit:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Unit"
                  onChange={onchangeHandler}
                  defaultValue={newUnit.name}
                />
              </div>
              <div className="pair">
                <label>Publish:</label>
                <select
                  name="publish"
                  id="publish"
                  onChange={onchangeHandler}
                  defaultValue={newUnit.publish}
                >
                  <option>Publish</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <button>Add unit</button>
            </form>
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default AddUnit;
