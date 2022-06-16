import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import MainRouter from "../Routes";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

// Styles
import { LayoutStyle, Right } from "./Layout.Styles";

const Layout = () => {
  const [title, setTitle] = useState("");

  return (
    <LayoutStyle>
      <Sidebar />
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
      <Right>
        <Topbar title={title} setTitle={setTitle} />
        <MainRouter title={title} setTitle={setTitle} />
      </Right>
    </LayoutStyle>
  );
};

export default Layout;
