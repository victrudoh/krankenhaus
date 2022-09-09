import React from "react";

// styles
import { LayoutStyle, Right } from "../layout/Layout.Styles";

// Components
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import PharmacyRoutes from "../appRoutes/PharmacyRoutes";

const PharmacyLayout = () => {
  return (
    <>
      <LayoutStyle>
        <Sidebar />
        <Right>
          <Topbar />
          <PharmacyRoutes />
        </Right>
      </LayoutStyle>
    </>
  );
};

export default PharmacyLayout;
