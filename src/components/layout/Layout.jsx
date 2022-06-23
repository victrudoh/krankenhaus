import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import MainRouter from "../Routes";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import Login from "../../pages/login/Login";
import Spinner from "../spinner/Spinner";

// Styles
import { LayoutStyle, Right } from "./Layout.Styles";
import { useEffect } from "react";

const Layout = () => {
  const [title, setTitle] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  console.log(window.location.href);
  let url = window.location.href;

  const SetLogin = (url) => {
    if (url === "http://localhost:3000/login") {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  };

  useEffect(() => {
    SetLogin(url);
  }, []);

  //http://localhost:3000/login

  return (
    <>
      {showLogin ? (
        <Login />
      ) : (
        <>
          <LayoutStyle>
            <Sidebar />
            <Right>
              <Topbar title={title} setTitle={setTitle} />
              <ToastContainer
                position="top-right" //Alert is not working, fix it
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <MainRouter title={title} setTitle={setTitle} />
            </Right>
          </LayoutStyle>
        </>
      )}
    </>
  );
};

export default Layout;
