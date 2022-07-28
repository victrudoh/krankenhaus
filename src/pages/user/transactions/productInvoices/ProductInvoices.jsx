import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper } from "./ProductInvoices.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";
import ViewInvoice from "../../createInvoice/viewInvoice/ViewInvoice";

const ProductInvoices = () => {
  const { savedInvoice } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        {savedInvoice.display === false ? (
          <>
            <List />
            <Panel />
          </>
        ) : (
          <>
            <ViewInvoice />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ProductInvoices;
