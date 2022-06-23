import React from "react";

// Styles
import { Wrapper } from "./DeptHistory.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";

const DeptHistory = ({ setByUnit }) => {
  return (
    <>
      <Wrapper>
        <List setByUnit={setByUnit} />
        <Panel />
      </Wrapper>
    </>
  );
};

export default DeptHistory;
