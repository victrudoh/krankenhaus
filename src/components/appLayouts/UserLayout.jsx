import React from "react";

// styles
import { LayoutStyle, Right } from "../layout/Layout.Styles";

// components
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import UserRoutes from "../appRoutes/UserRoutes";

const UserLayout = () => {
  return (
    <>
      <LayoutStyle>
        <Sidebar />
        <Right>
          <Topbar />
          <UserRoutes />
        </Right>
      </LayoutStyle>
    </>
  );
};

export default UserLayout;
