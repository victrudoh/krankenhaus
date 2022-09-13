import React, { useContext } from "react";

// Styles
import { Wrapper } from "./Suppliers.Styles";

// components
import List from "./list/List";
import Panel from "./panel/Panel";
import EditSupplier from "./editSuppliers/EditSupplier";
import AppContext from "../../../context/AppContext";

const Suppliers = () => {
  const { editSupplier } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        <List />
        {editSupplier.editing ? (
          <>
            <EditSupplier />
          </>
        ) : (
          <Panel />
        )}
      </Wrapper>
    </>
  );
};

export default Suppliers;
