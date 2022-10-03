import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

// styles
import { Wrapper } from "./Users.Styles";

// components
import UsersList from "./usersList/UsersList";
import AddUser from "./addUser/AddUser";
import EditUser from "./editUser/EditUser";

const Users = () => {
  const { editUser } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        <UsersList />
        {editUser.editing ? (
          <>
            <EditUser />
          </>
        ) : (
          <AddUser />
        )}
      </Wrapper>
    </>
  );
};

export default Users;
