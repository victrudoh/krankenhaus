import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import { Wrapper, Top } from "./ProductHistory.Styles";

// components
import ProductHistoryList from "./productHistoryList/ProductHistoryList";
import ProductHistoryPanel from "./productHistoryPanel/ProductHistoryPanel";

const ProductHistory = ({ setIsCustomer }) => {
  return (
    <>
      <Wrapper>
        <ProductHistoryList setIsCustomer={setIsCustomer} />
        <ProductHistoryPanel />
      </Wrapper>
    </>
  );
};

export default ProductHistory;
