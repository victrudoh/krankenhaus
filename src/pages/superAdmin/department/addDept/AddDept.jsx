import React, { useState, useContext } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import AppContext from "../../../../context/AppContext";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./AddDept.Styles";

const AddDept = () => {
  const {
    leftPanelLoading,
    setLeftPanelLoading,
    setAddedDept,
    getDepartments,
  } = useContext(AppContext);

  const [newDept, setNewDept] = useState({
    name: "",
    publish: "",
  });

  const addDept = async (e) => {
    e.preventDefault();
    try {
      setLeftPanelLoading(true);
      const response = await axios.post(
        "https://hospital-ms-api.onrender.com/departments/new",
        newDept,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLeftPanelLoading(false);
      if (response.status === 200) {
        success("Creeated new department successfully");
        getDepartments();
        setAddedDept(response.status);
      }
    } catch (err) {
      error("  Couldn't add department");
      console.log(err);
      setLeftPanelLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewDept((newDept) => ({
      ...newDept,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        <h5>Add department</h5>
        <Content>
          {leftPanelLoading ? (
            <CircleSpinner />
          ) : (
            <form onSubmit={addDept}>
              <div className="pair">
                <label>Department:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Department"
                  onChange={onchangeHandler}
                  defaultValue={newDept.name}
                />
              </div>
              <div className="pair">
                <label>Publish:</label>
                <select
                  name="publish"
                  id="publish"
                  onChange={onchangeHandler}
                  defaultValue={newDept.publish}
                >
                  <option>Publish</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <button>Add department</button>
            </form>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default AddDept;
