import React, { useState } from "react";

// Styles
import { Top, Wrapper } from "./Transactions.Styles";

// components
import CustomerInvoices from "./customerInvoices/CustomerInvoices";
import ProductInvoices from "./productInvoices/ProductInvoices";
import EndOfDaySummary from "./endOfDaySummary/EndOfDaySummary";

const Transactions = () => {
  const [display, setDisplay] = useState("records");

  const SelectedDisplay = (e) => {
    if (e.display === "records") {
      return <ProductInvoices />;
    } else if (e.display === "invoices") {
      return <CustomerInvoices />;
    } else if (e.display === "summaries") {
      return <EndOfDaySummary />;
    }
  };

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setDisplay("records")}>
            Invoices by Products
          </button>
          <button onClick={() => setDisplay("invoices")}>
            Invoices by Customers
          </button>
          <button onClick={() => setDisplay("summaries")}>
            End of Day Summary
          </button>
        </Top>

        <SelectedDisplay display={display} />
      </Wrapper>
    </>
  );
};

export default Transactions;
