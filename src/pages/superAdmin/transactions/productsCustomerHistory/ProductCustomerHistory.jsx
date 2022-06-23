import React from "react";
import { useState } from "react";

// Styles
import { Wrapper, Top } from "./ProductCustomerHistory.Styles";

// Components
import ProductHistory from "./productHistory/ProductHistory";
import CustomerHistory from "./customerHistory/CustomerHistory";

const ProductCustomerHistory = () => {
  const [isCustomer, setIsCustomer] = useState(true);

  return (
    <>
      <Wrapper>
        {isCustomer ? (
          <CustomerHistory setIsCustomer={setIsCustomer} />
        ) : (
          <ProductHistory setIsCustomer={setIsCustomer} />
        )}
      </Wrapper>
    </>
  );
};

export default ProductCustomerHistory;
