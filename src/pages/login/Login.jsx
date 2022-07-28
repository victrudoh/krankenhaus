import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { success, error } from "../../helpers/Alert";
import { success, error } from "../../helpers/Alert";

import "./login.css";

// components
import Spinner from "../../components/spinner/Spinner";
import AppContext from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AppContext);

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    setLoading(true);
    console.log("loginDetails", loginDetails);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hospital-ms-api.herokuapp.com/auth/login",
        loginDetails,
        {
          headers: { "content-type": "application/json" },
        }
      );
      // console.log("response", response);
      const token = response.data.token;
      const userId = response.data.user.id;
      setLoading(false);
      if (response.status === 200) {
        success("Login Successful");
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        if (response.data.user.access === "full") {
          navigate("/");
          window.location.reload(false);
        }
        if (response.data.user.access === "limited") {
          navigate("/");
          window.location.reload(false);
        }
      }
    } catch (err) {
      console.log(err);
      error(err.response.data.error);
      setLoading(false);
    }
  };

  const onchangeHandler = async (e) => {
    e.persist();
    setLoginDetails((loginDetails) => ({
      ...loginDetails,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="title">Krankenhaus</h1>
        {loading ? (
          <>
            <div
              className=""
              style={{
                paddingTop: "9rem",
                height: "100vh",
                margin: "auto 0",
              }}
            >
              <Spinner />
            </div>
          </>
        ) : (
          <div className="center">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <div className="txt_field">
                <input
                  name="username"
                  type="text"
                  required
                  onChange={onchangeHandler}
                  defaultValue={loginDetails.username}
                />
                <span></span>
                <label>Username</label>
              </div>
              <div className="txt_field">
                <input
                  name="password"
                  type="password"
                  required
                  onChange={onchangeHandler}
                  defaultValue={loginDetails.password}
                />
                <span></span>
                <label>Password</label>
              </div>
              <button className="loginButton" type="submit">
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
