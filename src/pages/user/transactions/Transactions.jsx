import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

// Styles
import { Top, Wrapper } from "./Transactions.Styles";

// components
import CustomerInvoices from "./customerInvoices/CustomerInvoices";
import ProductInvoices from "./productInvoices/ProductInvoices";
import EndOfDaySummary from "./endOfDaySummary/EndOfDaySummary";

const Transactions = () => {
  const { transactionDisplayPage, setTransactionDisplayPage } =
    useContext(AppContext);

  const SelectedDisplay = () => {
    if (transactionDisplayPage === "products") {
      return <ProductInvoices />;
    } else if (transactionDisplayPage === "customers") {
      return <CustomerInvoices />;
    } else if (transactionDisplayPage === "summary") {
      return <EndOfDaySummary />;
    }
  };

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setTransactionDisplayPage("products")}>
            Transactions by Products
          </button>
          <button onClick={() => setTransactionDisplayPage("customers")}>
            Transactions by Customers
          </button>
          <button onClick={() => setTransactionDisplayPage("summary")}>
            End of Day Summary
          </button>
        </Top>

        <SelectedDisplay />
      </Wrapper>
    </>
  );
};

export default Transactions;
