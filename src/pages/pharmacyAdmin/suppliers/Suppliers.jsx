import React, { useContext } from "react";

// Styles
import { Wrapper } from "./Suppliers.Styles";

// components
import List from "./list/List";
import Panel from "./panel/Panel";

const Suppliers = () => {
  return (
    <>
      <Wrapper>
        <List />
        <Panel />
      </Wrapper>
    </>
  );
};

export default Suppliers;
