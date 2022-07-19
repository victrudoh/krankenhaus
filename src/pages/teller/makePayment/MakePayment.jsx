import React from "react";

// styles
import { Wrapper } from "./MakePayment.Styles";

// components
import List from "./list/List";
import Panel from "./panel/Panel";

const MakePayment = () => {
  return (
    <>
      <Wrapper>
        <List />
        <Panel />
      </Wrapper>
    </>
  );
};

export default MakePayment;
