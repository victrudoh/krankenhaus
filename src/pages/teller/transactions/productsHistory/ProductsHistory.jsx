import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper } from "./ProductsHistory.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";
import ViewInvoice from "../../../user/createInvoice/viewInvoice/ViewInvoice";

const ProductsHistory = () => {
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

export default ProductsHistory;
