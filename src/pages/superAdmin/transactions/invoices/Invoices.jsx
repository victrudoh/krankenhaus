import React from "react";
import { useState } from "react";

// Styles
import { Wrapper } from "./Invoices.Styles";

// Components
import ProductInvoices from "./productInvoices/ProductInvoices";
import CustomerInvoices from "./customerInvoices/CustomerInvoices";

const Invoices = () => {
  const [isCustomer, setIsCustomer] = useState(false);

  return (
    <>
      <Wrapper>
        {isCustomer ? (
          <CustomerInvoices setIsCustomer={setIsCustomer} />
        ) : (
          <ProductInvoices setIsCustomer={setIsCustomer} />
        )}
      </Wrapper>
    </>
  );
};

export default Invoices;
