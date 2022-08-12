import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper } from "./EndOfDaySummary.Styles";

// Components
import Panel from "./panel/Panel";
import EndOfDayTemplate from "../../../../templates/endOfDayTemplate/EndOfDayTemplate";

const EndOfDaySummary = () => {
  const { savedInvoice } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        {savedInvoice.display ? <EndOfDayTemplate /> : <Panel />}
      </Wrapper>
    </>
  );
};

export default EndOfDaySummary;
