import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper } from "./CustomerInvoices.Styles";

// components
import List from "./list/List";
import Panel from "./panel/Panel";
import ViewInvoice from "../../createInvoice/viewInvoice/ViewInvoice";

const CustomerInvoices = () => {
  const { savedCustomerInvoice } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        {savedCustomerInvoice.display === false ? (
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
