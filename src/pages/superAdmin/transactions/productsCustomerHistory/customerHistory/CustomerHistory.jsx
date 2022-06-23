import React from "react";

// Styles
import { Wrapper } from "./CustomerHistory.Styles";

// components
import List from "./list/List";
import Panel from "./panel/Panel";

const CustomerHistory = ({ setIsCustomer }) => {
  return (
    <>
      <Wrapper>
        <List setIsCustomer={setIsCustomer} />
        <Panel />
      </Wrapper>
    </>
  );
};

export default CustomerHistory;
