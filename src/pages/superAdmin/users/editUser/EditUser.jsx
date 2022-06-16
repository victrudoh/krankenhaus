import React from "react";

// Styles
import { Wrapper, Content } from "./EditUser.Styles";

const EditUser = ({ setIsEditing }) => {
  const editHandler = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Wrapper>
        <h5>Edit User</h5>
        <Content>
          <form>
            <div className="pair">
              <label>First name:</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First name"
              />
            </div>
            <div className="pair">
              <label>Last name:</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="last name"
              />
            </div>
            <div className="pair">
              <label>Department:</label>
              <select name="dept" id="dept">
                <option value="revenue">Revenue</option>
                <option value="iccu">ICCU</option>
                <option value="dental">Dental</option>
              </select>
            </div>
            <div className="pair">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="pair">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </div>
            <div className="pair">
              <label>Re-enter password:</label>
              <input
                type="password"
                name="password_confirm"
                id="password_confirm"
                placeholder="Re-enter password"
              />
            </div>
            <div className="pair">
              <label>Account type:</label>
              <input
                type="text"
                name="role"
                id="role"
                placeholder="Account type"
              />
            </div>
            <div className="pair">
              <label>Privilege:</label>
              <input
                type="text"
                name="privilege"
                id="privilege"
                placeholder="Privilege"
              />
            </div>
            <div className="pair">
              <label>Active:</label>
              <select name="active" id="active">
                <option value="enable">Enable</option>
                <option value="disable">Disable</option>
              </select>
            </div>
            <button type="submit">Update user</button>
            <button className="mx-3" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default EditUser;
