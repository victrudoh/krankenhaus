import React from "react";

// Styles
import { Wrapper } from "./TrackPayment.Styles";

// components
import List from "./list/List";
import Panel from "./panel/Panel";

const TrackPayment = () => {
  return (
    <>
      <Wrapper>
        <List />
        <Panel />
      </Wrapper>
    </>
  );
};

export default TrackPayment;
