import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./context/AppContext";

// Components
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/appLayouts/AuthLayout";
import UserLayout from "./components/appLayouts/UserLayout";
import TellerLayout from "./components/appLayouts/TellerLayout";
import PharmacyLayout from "./components/appLayouts/PharmacyLayout";

const SwitchLayout = () => {
  const token = localStorage.getItem("token");
  const { user } = useContext(AppContext);

  // console.log("Switch Layout");
  const SelectedDisplay = () => {
    if (!token) {
      return <AuthLayout />;
    } else {
      if (user.access === "full") {
        if (user.role === "pharmacy-admin") {
          return <PharmacyLayout />;
        }
        return <Layout />;
      } else if (user.access === "limited") {
        if (user.role === "teller") {
          return <TellerLayout />;
        }
        if (user.department === "Pharmacy") {
          return <PharmacyLayout />;
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
