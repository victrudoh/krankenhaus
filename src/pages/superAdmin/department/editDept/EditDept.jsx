import React, { useContext, useState } from "react";
import axios from "axios";
import AppContext from "../../../../context/AppContext";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./EditDept.Styles";

const EditDept = ({ setIsEditing }) => {
  const {
    loading,
    setLoading,
    departments,
    getDepartments,
    editDeptId,
    SetEditedDept,
  } = useContext(AppContext);

  const [editDept, setEditDept] = useState({
    publish: "",
  });

  // find department
  const foundDept = departments[editDeptId].department;

  // Edit Department function
  const editDeptFunction = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.herokuapp.com/departments/edit/${foundDept.id}`,
        editDept,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success("Updated department successfully!");
        SetEditedDept(response.status);
        setIsEditing(false);
        getDepartments();
      }
    } catch (err) {
      error("Psych! Couldn't edit department");
      console.log(err);
      setLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setEditDept((editDept) => ({
      ...editDept,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        <h5>Edit department</h5>
        <Content>
          <form onSubmit={editDeptFunction}>
            <div className="pair">
              <label>Department:</label>
              <h4>{foundDept.name}</h4>
            </div>
            <div className="pair">
              <label>Publish:</label>
              <select name="publish" id="publish" onChange={onchangeHandler}>
                <option>Publish</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            {loading ? (
              <CircleSpinner />
            ) : (
              <>
                <button type="submit">Update department</button>
                <button className="mx-3" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </>
            )}
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default EditDept;
