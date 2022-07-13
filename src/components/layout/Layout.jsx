import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <MainRouter />
            </Right>
          </LayoutStyle>
        </>
      )}
    </>
  );
};

export default Layout;
