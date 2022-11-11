import React, { useContext } from "react";

// Styles
import { Top, Wrapper } from "./Transactions.Styles";

// components
import ProductCustomerHistory from "./productsCustomerHistory/ProductCustomerHistory";
import Invoices from "./invoices/Invoices";
import UnitDeptHistory from "./unitDeptHistory/UnitDeptHistory";
import AppContext from "../../../context/AppContext";

const Transactions = () => {
  const { trxDisplay, setTrxDisplay } = useContext(AppContext);

  const SelectedDisplay = () => {
    if (trxDisplay === "records") {
      return <ProductCustomerHistory />;
    } else if (trxDisplay === "invoices") {
      return <Invoices />;
    } else if (trxDisplay === "summaries") {
      return <UnitDeptHistory />;
    } else {
      return <ProductCustomerHistory />;
    }
  };

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setTrxDisplay("records")}>
            Transaction Histories
          </button>
          {/* <button onClick={() => setTrxDisplay("invoices")}>
            Generated Invoices
          </button> */}
          <button onClick={() => setTrxDisplay("summaries")}>
            Departmental Summaries
          </button>
          <div className="mx-5"></div>
        </Top>

        <SelectedDisplay />
      </Wrapper>
    </>
  );
};

export default Transactions;
