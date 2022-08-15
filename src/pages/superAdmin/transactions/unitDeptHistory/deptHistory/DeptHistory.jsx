import React from "react";

// Styles
import { Wrapper } from "./DeptHistory.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";

const DeptHistory = () => {
  return (
    <>
      <Wrapper>
        <List />
        <Panel />
      </Wrapper>
    </>
  );
};

export default DeptHistory;
