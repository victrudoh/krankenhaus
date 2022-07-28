import React from "react";

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
          <Topbar />
          <TellerRoutes />
        </Right>
      </LayoutStyle>
    </>
  );
};

export default TellerLayout;
