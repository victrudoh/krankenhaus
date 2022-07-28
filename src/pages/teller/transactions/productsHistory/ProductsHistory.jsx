import React from "react";

// Styles
import { Wrapper } from "./ProductsHistory.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";

const ProductsHistory = () => {
  return (
    <>
      <Wrapper>
        <List />
        <Panel />
      </Wrapper>
    </>
  );
};

export default ProductsHistory;
