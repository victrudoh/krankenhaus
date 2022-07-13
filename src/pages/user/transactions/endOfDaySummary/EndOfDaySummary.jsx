import React from "react";

// Styles
import { Wrapper } from "./EndOfDaySummary.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";

const EndOfDaySummary = () => {
  return (
    <>
      <Wrapper>
        <List />
        <Panel />
      </Wrapper>
    </>
  );
};

export default EndOfDaySummary;
