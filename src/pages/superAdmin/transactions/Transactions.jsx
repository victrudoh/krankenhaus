import React, { useState } from "react";

// Styles
import { Top, Wrapper } from "./Transactions.Styles";

// components
import ProductCustomerHistory from "./productsCustomerHistory/ProductCustomerHistory";
import Invoices from "./invoices/Invoices";
import UnitDeptHistory from "./unitDeptHistory/UnitDeptHistory";

const Transactions = ({ setTitle }) => {
  setTitle("Transactions");

  const [display, setDisplay] = useState("records");

  const SelectedDisplay = (e) => {
    if (e.display === "records") {
      return <ProductCustomerHistory />;
    } else if (e.display === "invoices") {
      return <Invoices />;
    } else if (e.display === "summaries") {
      return <UnitDeptHistory />;
    }
  };

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setDisplay("records")}>
            Transaction Histories
          </button>
          <button onClick={() => setDisplay("invoices")}>
            Generated Invoices
          </button>
          <button onClick={() => setDisplay("summaries")}>
            Departmental Summaries
          </button>
        </Top>

        <SelectedDisplay display={display} />
      </Wrapper>
    </>
  );
};

export default Transactions;
