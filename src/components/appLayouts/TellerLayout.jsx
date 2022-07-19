import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import { LayoutStyle, Right } from "../layout/Layout.Styles";

// Components
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import TellerRoutes from "../appRoutes/TellerRoutes";

const TellerLayout = () => {
  return (
    <>
      <LayoutStyle>
        <Sidebar />
        <Right>
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
          <Topbar />
          <TellerRoutes />
        </Right>
      </LayoutStyle>
    </>
  );
};

export default TellerLayout;
