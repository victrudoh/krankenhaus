import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";

// styles
import { Wrapper, Content } from "./AddPrivilege.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const AddPrivilege = () => {
  const { loading, savedDeptId, departments } = useContext(AppContext);

  const [newPriv, setNewPriv] = useState({
    privId: "",
  });
  const [allPrivs, setAllPrivs] = useState([]);

  const foundDept = departments[savedDeptId].department;

  // Fetch all privileges
  const getAllPrivs = async () => {
    try {
      // console.log("privs", privs);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/departments/privileges/all`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("response", response);
      if (response.status === 200) {
        success("Fetched all privileges");
        setAllPrivs(response.data.privileges);
      }
    } catch (err) {
      error("Couldn't fetch privileges");
      if (err.response.status === 401) {
        error(err.response.data.message);
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // Add privilege
  const addPriv = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://hospital-ms-api.herokuapp.com/departments/privilleges/add?departmentId=${foundDept.id}&privillegeId=${newPriv.privId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        success(`Added privilege`);
        // setAllPrivs(response.data.privileges);
      }
    } catch (err) {
      error("Couldn't fetch privileges");
      // if (err.response.status === 401) {
      //   error(err.response.data.message);
      //   localStorage.removeItem("token");
      //   window.location.reload(false);
      // }
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewPriv(() => ({
      ...newPriv,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getAllPrivs();
  }, []);

  return (
    <Wrapper>
      <h5>Add a new privilege</h5>
      <Content>
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
            <form onSubmit={addPriv}>
              <div className="pair">
                <label>Privilege:</label>
                <select
                  name="privId"
                  id="privId"
                  required
                  onChange={onchangeHandler}
                  defaultValue={newPriv.privilege}
                >
                  <option>Select privilege</option>
                  {allPrivs.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit">Add privilege</button>
            </form>
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default AddPrivilege;
