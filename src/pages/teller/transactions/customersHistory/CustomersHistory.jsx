import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper } from "./CustomersHistory.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";
import ViewInvoice from "../../../user/createInvoice/viewInvoice/ViewInvoice";
import ViewDetails from "../../../../templates/viewDetails/ViewDetails";

const CustomersHistory = () => {
  const { getDetails } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        {getDetails.display === false ? (
          <>
            <List />
            <Panel />
          </>
        ) : (
          <>
            {/* <ViewInvoice /> */}
            <ViewDetails />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default CustomersHistory;
