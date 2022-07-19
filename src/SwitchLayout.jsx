import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./context/AppContext";
import { success } from "./helpers/Alert";

// Components
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/appLayouts/AuthLayout";
import UserLayout from "./components/appLayouts/UserLayout";
import TellerLayout from "./components/appLayouts/TellerLayout";

const SwitchLayout = () => {
  const token = localStorage.getItem("token");
  const { user } = useContext(AppContext);

  console.log("Switch Layout");
  const SelectedDisplay = () => {
    if (!token) {
      return <AuthLayout />;
    } else {
      if (user.access === "full") {
        return <Layout />;
      } else if (user.access === "limited") {
        if (user.role === "teller") {
          return <TellerLayout />;
        }
        return <UserLayout />;
      }
      return <AuthLayout />;
    }
  };

  return (
    <>
      <BrowserRouter>
        <SelectedDisplay />
      </BrowserRouter>
    </>
  );
};

export default SwitchLayout;
