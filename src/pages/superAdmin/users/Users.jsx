import React, { useState } from "react";

// Styles
import { Wrapper } from "./Users.Styles";

// components
import UsersList from "./usersList/UsersList";
import AddUser from "./addUser/AddUser";
import EditUser from "./editUser/EditUser";

const Users = ({ setTitle }) => {
  setTitle("Users");

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Wrapper>
        <UsersList setIsEditing={setIsEditing} />
        {isEditing ? (
          <>
            <EditUser setIsEditing={setIsEditing} />
          </>
        ) : (
          <AddUser />
        )}
      </Wrapper>
    </>
  );
};

export default Users;
