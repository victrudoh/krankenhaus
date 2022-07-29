import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper, Top } from "./ProductCustomerHistory.Styles";

// Components
import ProductHistory from "./productHistory/ProductHistory";
import CustomerHistory from "./customerHistory/CustomerHistory";

const ProductCustomerHistory = () => {
  const { showProductPage } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        {showProductPage === false ? <CustomerHistory /> : <ProductHistory />}
      </Wrapper>
    </>
  );
};

export default ProductCustomerHistory;
