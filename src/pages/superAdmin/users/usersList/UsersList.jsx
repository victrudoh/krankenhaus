import React from "react";
import { NavLink } from "react-router-dom";

// styles
import { Wrapper, Top } from "./UsersList.Styles";

const UsersList = ({ setIsEditing }) => {
  const editHandler = () => {
    setIsEditing(true);
    // collect user ID and pass it to the edit page, use state to carry the ID or something
  };

  return (
    <>
      <Wrapper>
        <Top>
          <NavLink exact to="/superadmin/userlogs">
            User logs
          </NavLink>
          <div className="pair">
            <form>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </Top>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Full name</th>
              <th scope="col">Username</th>
              <th scope="col">Department</th>
              <th scope="col">Account type</th>
              <th scope="col">Rights</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={editHandler}>
              <th scope="row">1</th>
              <td>Mark Joseph</td>
              <td>Otto</td>
              <td>Accounts</td>
              <td>teller</td>
              <td>limited</td>
            </tr>
            <tr onClick={editHandler}>
              <th scope="row">2</th>
              <td>Roxxy Smith</td>
              <td>@fat</td>
              <td>Revenue</td>
              <td>Admin</td>
              <td>full</td>
            </tr>
            <tr onClick={editHandler}>
              <th scope="row">3</th>
              <td>Daniel Regha</td>
              <td>@twixx</td>
              <td>Dental</td>
              <td>user</td>
              <td>limited</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default UsersList;
