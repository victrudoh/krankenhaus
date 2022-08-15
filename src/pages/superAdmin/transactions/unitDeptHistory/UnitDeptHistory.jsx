import React, { useContext } from "react";

// Styles
import { Wrapper } from "./UnitDeptHistory.Styles";

// components
import DeptHistory from "./deptHistory/DeptHistory";
import UnitHistory from "./unitHistory/UnitHistory";
import AppContext from "../../../../context/AppContext";

const UnitDeptHistory = () => {
  const { byUnit } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        {byUnit ? (
          <>
            <UnitHistory />
          </>
        ) : (
          <>
            <DeptHistory />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default UnitDeptHistory;
