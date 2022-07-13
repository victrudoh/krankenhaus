import React from "react";

// Styles
import { Wrapper } from "./CustomerInvoices.Styles";

// components
import List from "./list/List";
import Panel from "./panel/Panel";

const CustomerInvoices = ({ setIsCustomer }) => {
  return (
    <>
      <Wrapper>
        <List setIsCustomer={setIsCustomer} />
        <Panel />
      </Wrapper>
    </>
  );
};

export default CustomerInvoices;
