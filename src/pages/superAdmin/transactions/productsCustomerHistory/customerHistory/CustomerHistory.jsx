import React, { useContext } from "react";
import AppContext from "../../../../../context/AppContext";

// Styles
import { Wrapper } from "./CustomerHistory.Styles";

// components
import List from "./list/List";
import Panel from "./panel/Panel";
import ViewDetails from "../../../../../templates/viewDetails/ViewDetails";

const CustomerHistory = ({ setIsCustomer }) => {
  const { getDetails } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        {getDetails.display === false ? (
          <>
            <List setIsCustomer={setIsCustomer} />
            <Panel />
          </>
        ) : (
          <>
            <ViewDetails />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default CustomerHistory;
