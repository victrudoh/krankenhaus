import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import AppContext from "../../../../context/AppContext";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Content, Wrapper } from "./AddUser.Styles";

const AddUser = () => {
  const {
    getUsers,
    leftPanelLoading,
    setLeftPanelLoading,
    setAddedUser,
    pharmacyUnits,
    deptForInventory,
  } = useContext(AppContext);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    department: "Pharmacy",
    unit: "",
    role: "",
    active: true,
    access: "",
  });

  const [editUser, setEditUser] = useState({
    isEditing: false,
    user: {},
  });

  const addUser = async (e) => {
    console.log("newUser", newUser);
    e.preventDefault();
    try {
      setLeftPanelLoading(true);
      const response = await axios.post(
        "https://hospital-ms-api.onrender.com/users/create",
        newUser,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLeftPanelLoading(false);
      if (response.status === 200) {
        success("Created new user successfully");
        setAddedUser(response.status);
        getUsers();
      }
    } catch (err) {
      setLeftPanelLoading(false);
      error("Couldn't create user");
      error(err.response.data.error);
      console.log(err);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewUser((newUser) => ({
      ...newUser,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setEditUser(() => ({
      ...editUser,
      user: newUser,
    }));
  }, []);

  return (
    <>
      <Wrapper>
        <h5>Add User</h5>
        <Content>
          {leftPanelLoading ? (
            <CircleSpinner />
          ) : (
            <form onSubmit={addUser}>
              {/* firstname */}
              <div className="pair">
                <label>First name:</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  placeholder="First name"
                  onChange={onchangeHandler}
                  defaultValue={newUser.firstName}
                />
              </div>
              {/* lastname */}
              <div className="pair">
                <label>Last name:</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  placeholder="last name"
                  onChange={onchangeHandler}
                  defaultValue={newUser.lastName}
                />
              </div>
              {/* username */}
              <div className="pair">
                <label>Username:</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  required
                  placeholder="Username"
                  onChange={onchangeHandler}
                  defaultValue={newUser.userName}
                />
              </div>
              {/* password */}
              <div className="pair">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="password"
                  onChange={onchangeHandler}
                  defaultValue={newUser.password}
                />
              </div>
              {/* department */}
              <div className="pair">
                <label>Department:</label>
                <select
                  name="department"
                  id="department"
                  required
                  onChange={onchangeHandler}
                  defaultValue={newUser.department}
                >
                  <option value="">Select department</option>
                  {deptForInventory.map((item, i) =>
                    item.name === "Pharmacy" ? (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    ) : (
                      ""
                    )
                  )}
                </select>
              </div>
              {/* unit */}
              {newUser.department && (
                <>
                  <div className="pair">
                    <label>Unit:</label>
                    <select
                      name="unit"
                      id="unit"
                      required
                      onChange={onchangeHandler}
                      defaultValue={newUser.unit}
                    >
                      <option value="">Select unit</option>
                      {pharmacyUnits.map((item, i) => (
                        <option key={i} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              {/* role */}
              <div className="pair">
                <label>Account type:</label>
                <select
                  name="role"
                  id="role"
                  required
                  onChange={onchangeHandler}
                  defaultValue={newUser.password}
                >
                  <option>Select role</option>
                  <option value="pharmacy-admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              {/* privilege */}
              <div className="pair">
                <label>Privilege:</label>
                <select
                  name="access"
                  id="access"
                  required
                  onChange={onchangeHandler}
                  defaultValue={newUser.access}
                >
                  <option>Select privilege</option>
                  <option value="full">Full</option>
                  <option value="limited">Limited</option>
                </select>
              </div>

              <button type="submit">Add user</button>
            </form>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default AddUser;
