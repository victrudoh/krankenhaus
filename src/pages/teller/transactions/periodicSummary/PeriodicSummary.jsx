import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// styles
import { Wrapper } from "./PeriodicSummary.Styles";

// Components
import List from "./list/List";
import Panel from "./panel/Panel";
import ViewInvoice from "../../../user/createInvoice/viewInvoice/ViewInvoice";

// templates
import PeriodicSummaryTemplate from "../../../../templates/periodicSummary/PeriodicSummaryTemplate";

const PeriodicSummary = () => {
  const { savedInvoice } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        {savedInvoice.display === false ? (
          <>
            {/* <List /> */}
            <Panel />
          </>
        ) : (
          <>
            <PeriodicSummaryTemplate />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default PeriodicSummary;
