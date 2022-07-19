import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

// Styles
import { Top, Wrapper } from "./Transactions.Styles";

const Transactions = () => {
  const { transactionDisplayPage, setTransactionDisplayPage } =
    useContext(AppContext);
  return <div>Transactions</div>;
};

export default Transactions;
