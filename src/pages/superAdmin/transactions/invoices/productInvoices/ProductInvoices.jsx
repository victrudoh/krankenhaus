import React from "react";

// Styles
import { Wrapper } from "./ProductInvoices.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";

const ProductInvoices = ({ setIsCustomer }) => {
  return (
    <>
      <Wrapper>
        <List setIsCustomer={setIsCustomer} />
        <Panel />
      </Wrapper>
    </>
  );
};

export default ProductInvoices;
