import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { success, error } from "../../helpers/Alert";

import "./login.css";

// components
import Spinner from "../../components/spinner/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const goHomeHandler = () => {
    success("Login successful!");
    navigate("/");
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="title">Krankenhaus</h1>
        <div class="center">
          <h1>Login</h1>
          <form onSubmit={goHomeHandler}>
            <div class="txt_field">
              <input name="username" type="text" required />
              <span></span>
              <label>Username</label>
            </div>
            <div class="txt_field">
              <input name="password" type="password" required />
              <span></span>
              <label>Password</label>
            </div>
            <button className="loginButton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
