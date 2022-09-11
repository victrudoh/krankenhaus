import React, { useContext } from "react";

// Styles
import { Top, Wrapper } from "./Products.Styles";

// components
import AppContext from "../../../context/AppContext";
import Available from "./available/Available";

const Products = () => {
  const { pharmProdDisplay, setPharmProdDisplay } = useContext(AppContext);

  const SelectedDisplay = () => {
    //   if (pharmProdDisplay === "available") {
    return <Available />;
    //   } else if (trxDisplay === "expired") {
    //     return <Invoices />;
    //   } else if (trxDisplay === "outofstock") {
    //     return <UnitDeptHistory />;
    //   }
  };

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setPharmProdDisplay("available")}>
            Available Products
          </button>
          <button onClick={() => setPharmProdDisplay("expired")}>
            Expired Products
          </button>
          <button onClick={() => setPharmProdDisplay("outofstock")}>
            Out of Stock
          </button>
          <div className="mx-5"></div>
        </Top>

        <SelectedDisplay />
      </Wrapper>
    </>
  );
};

export default Products;
