import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

// Styles
import { Top, Wrapper } from "./Transactions.Styles";

// components
import ProductsHistory from "./productsHistory/ProductsHistory";
import CustomersHistory from "./customersHistory/CustomersHistory";
import PeriodicSummary from "./periodicSummary/PeriodicSummary";

const Transactions = () => {
  const { transactionDisplayPage, setTransactionDisplayPage } =
    useContext(AppContext);

  const SelectedDisplay = () => {
    if (transactionDisplayPage === "products") {
      return <ProductsHistory />;
    } else if (transactionDisplayPage === "customers") {
      return <CustomersHistory />;
    } else if (transactionDisplayPage === "summary") {
      return <PeriodicSummary />;
    }
  };

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setTransactionDisplayPage("products")}>
            Invoices by Products
          </button>
          <button onClick={() => setTransactionDisplayPage("customers")}>
            Invoices by Customers
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
