import { useContext } from "react";

// Styles
import { Wrapper } from "./Users.Styles";

// components
import UsersList from "./usersList/UsersList";
import AddUser from "./addUser/AddUser";
import EditUser from "./editUser/EditUser";
import AppContext from "../../../context/AppContext";

const Users = () => {
  const { editUser } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        <UsersList />
        {/* <AddUser /> */}
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
