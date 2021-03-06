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
    loading,
    getUsers,
    setLoading,
    departments,
    setAddedUser,
    getDepartments,
  } = useContext(AppContext);

  const [unit, setUnit] = useState([]);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    department: "",
    unit: "",
    role: "",
    active: true,
    access: "",
  });

  const addUser = async (e) => {
    console.log("newUser", newUser);
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hospital-ms-api.herokuapp.com/users/create",
        newUser,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success("Created new user successfully");
        setAddedUser(response.status);
        getUsers();
      }
    } catch (err) {
      error("Psych");
      console.log(err);
      setLoading(false);
    }
  };

  const getUnit = async (name) => {
    if (name) {
      let foundUnit = await departments.filter((item) => {
        return item.department.name === name;
      });
      setUnit(foundUnit[0].units);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewUser((newUser) => ({
      ...newUser,
      [e.target.name]: e.target.value,
    }));
  };

  // // fetch unit when department is selected
  useEffect(() => {
    getUnit(newUser.department);
  }, [newUser.department]);

  // // set form to Edit mode
  // useEffect(() => {
  //   if (editUser.isEditing === true) {
  //     setNewUser({
  //       firstName: editUser.user.firstName,
  //       lastName: editUser.user.lastName,
  //       userName: editUser.user.userName,
  //       department: editUser.user.department,
  //       unit: editUser.user.unit,
  //       role: editUser.user.role,
  //       active: true,
  //       access: editUser.user.access,
  //     });
  //   }
  // }, [editUser]);

  return (
    <>
      <Wrapper>
        <h5>Add User</h5>
        <Content>
          {loading ? (
            <CircleSpinner />
          ) : (
            <form onSubmit={addUser}>
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
                  {departments.map((item, i) => (
                    <option key={i} value={item.department.name}>
                      {item.department.name}
                    </option>
                  ))}
                </select>
              </div>
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
                      {unit.map((item, i) => (
                        <option key={i} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
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
                  <option value="super-admin">Super admin</option>
                  <option value="bank-admin">Bank admin</option>
                  <option value="hospital-admin">Hospital admin</option>
                  <option value="admin">Admin</option>
                  <option value="teller">Teller</option>
                  <option value="user">User</option>
                </select>
              </div>
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
