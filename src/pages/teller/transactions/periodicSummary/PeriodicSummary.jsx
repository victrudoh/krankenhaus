import React from "react";

// styles
import { Wrapper } from "./PeriodicSummary.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";

const PeriodicSummary = () => {
  return (
    <>
      <Wrapper>
        <List />
        <Panel />
      </Wrapper>
    </>
  );
};

export default PeriodicSummary;
