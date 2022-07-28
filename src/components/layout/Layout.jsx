import React from "react";

// Components
import MainRouter from "../Routes";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import Login from "../../pages/login/Login";

// Styles
import { LayoutStyle, Right } from "./Layout.Styles";

const Layout = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <>
          <LayoutStyle>
            <Sidebar />
            <Right>
              <Topbar />
              <MainRouter />
            </Right>
          </LayoutStyle>
        </>
      )}
    </>
  );
};

export default Layout;
