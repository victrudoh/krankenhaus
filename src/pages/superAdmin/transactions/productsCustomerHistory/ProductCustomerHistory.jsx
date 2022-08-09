import React, { useContext } from "react";
import { useState } from "react";

// Styles
import { Wrapper, Top } from "./ProductCustomerHistory.Styles";

// Components
import ProductHistory from "./productHistory/ProductHistory";
import CustomerHistory from "./customerHistory/CustomerHistory";
import AppContext from "../../../../context/AppContext";

const ProductCustomerHistory = () => {
  const { displayCustomer, setDisplayCustomer } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        {displayCustomer ? <CustomerHistory /> : <ProductHistory />}
      </Wrapper>
    </>
  );
};

export default ProductCustomerHistory;
