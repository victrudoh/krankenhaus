import React from "react";
import { Wrapper } from "./UnitHistory.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";

const UnitHistory = () => {
  return (
    <>
      <Wrapper>
        <List />
        <Panel />
      </Wrapper>
    </>
  );
};

export default UnitHistory;
