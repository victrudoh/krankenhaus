import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper } from "./CustomersHistory.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";
import ViewInvoice from "../../../user/createInvoice/viewInvoice/ViewInvoice";

const CustomersHistory = () => {
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

export default CustomersHistory;
