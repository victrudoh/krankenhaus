import React from "react";

// styles
import { Wrapper } from "./CustomersHistory.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";

const CustomersHistory = () => {
  return (
    <>
      <Wrapper>
        <List />
        <Panel />
      </Wrapper>
    </>
  );
};

export default CustomersHistory;
