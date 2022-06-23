import React from "react";
import { Wrapper } from "./UnitHistory.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";

const UnitHistory = ({ setByUnit }) => {
  return (
    <>
      <Wrapper>
        <List setByUnit={setByUnit} />
        <Panel />
      </Wrapper>
    </>
  );
};

export default UnitHistory;
