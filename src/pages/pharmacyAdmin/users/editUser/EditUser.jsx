import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./EditUser.Styles";

const EditUser = () => {
  const {
    users,
    editUser,
    getUsers,
    leftPanelLoading,
    setLeftPanelLoading,
    setEditUser,
    setEditedUser,
    pharmacyUnits,
    deptForInventory,
  } = useContext(AppContext);

  const [updateUser, setUpdateUser] = useState({
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

  // find user based on index
  const foundUser = users[editUser.index];

  const submit = async (e) => {
    console.log("updateUser", updateUser);
    e.preventDefault();
    try {
      setLeftPanelLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.onrender.com/users/edit?userId=${foundUser.id}`,
        updateUser,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLeftPanelLoading(false);
      if (response.status === 200) {
        success("Updated user successfully");
        setEditedUser(response.status);
        getUsers();
      }
    } catch (err) {
      error("  can't update user");
      console.log(err);
      setLeftPanelLoading(false);
    }
  };

  const quitEditHandler = () => {
    setEditUser({
      index: "",
      editing: false,
    });
  };

  const onchangeHandler = (e) => {
    e.persist();
    setUpdateUser((updateUser) => ({
      ...updateUser,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setUpdateUser(() => ({
      ...foundUser,
    }));
    console.log(updateUser);
  }, [foundUser]);

  return (
    <>
      <Wrapper>
        <h5>Edit User</h5>
        {leftPanelLoading ? (
          <CircleSpinner />
        ) : (
          <>
            <Content>
              <form onSubmit={submit}>
                <div className="pair">
                  <label>First name:</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    placeholder="First name"
                    onChange={onchangeHandler}
                    defaultValue={foundUser.firstName}
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
                    defaultValue={foundUser.lastName}
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
                    defaultValue={foundUser.userName}
                  />
                </div>
                <div className="pair">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="password"
                    onChange={onchangeHandler}
                    // value={foundUser.password}
                  />
                </div>
                <div className="pair">
                  <label>Department:</label>
                  <select
                    name="department"
                    id="department"
                    required
                    onChange={onchangeHandler}
                    defaultValue={foundUser.department}
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
                {foundUser.department && (
                  <>
                    <div className="pair">
                      <label>Unit:</label>
                      <select
                        name="unit"
                        id="unit"
                        required
                        onChange={onchangeHandler}
                        defaultValue={foundUser.unit}
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
                <div className="pair">
                  <label>Account type:</label>
                  <select
                    name="role"
                    id="role"
                    required
                    onChange={onchangeHandler}
                    defaultValue={foundUser.role}
                  >
                    <option>Select role</option>
                    <option value="admin">Admin</option>
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
                    defaultValue={foundUser.access}
                  >
                    <option>Select privilege</option>
                    <option value="full">Full</option>
                    <option value="limited">Limited</option>
                  </select>
                </div>

                <button type="submit">Update user</button>
                <button className="mx-3" onClick={quitEditHandler}>
                  Cancel
                </button>
              </form>
            </Content>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default EditUser;
