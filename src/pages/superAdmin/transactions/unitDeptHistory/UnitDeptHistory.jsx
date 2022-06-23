import React from "react";
import { useState } from "react";

// Styles
import { Wrapper } from "./UnitDeptHistory.Styles";

// components
import DeptHistory from "./deptHistory/DeptHistory";
import UnitHistory from "./unitHistory/UnitHistory";

const UnitDeptHistory = () => {
  const [byUnit, setByUnit] = useState(false);

  return (
    <>
      <Wrapper>
        {byUnit ? (
          <>
            <UnitHistory setByUnit={setByUnit} />
          </>
        ) : (
          <>
            <DeptHistory setByUnit={setByUnit} />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default UnitDeptHistory;
