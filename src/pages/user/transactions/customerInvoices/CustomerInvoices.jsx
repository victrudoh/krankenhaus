import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper } from "./CustomerInvoices.Styles";

// components
import List from "./list/List";
import Panel from "./panel/Panel";
import ViewInvoice from "../../createInvoice/viewInvoice/ViewInvoice";

const CustomerInvoices = () => {
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

export default CustomerInvoices;
