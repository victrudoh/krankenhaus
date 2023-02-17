import React, { useState, useContext } from "react";

// Styles
import { Wrapper } from "./Products.Styles";

// components
import ProductList from "./productList/ProductList";
import ProductByUnit from "./productByUnit/ProductByUnit";
import AddProduct from "./addProduct/AddProduct";
import EditProduct from "./editProduct/EditProduct";
import AppContext from "../../../context/AppContext";

const Products = () => {
  const { editProduct, displayByUnit, user } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        {displayByUnit ? <ProductByUnit /> : <ProductList />}
        {user.role !== "admin_read_only" && (
          <>
            {editProduct.editing ? (
              <>
                <EditProduct />
              </>
            ) : (
              <AddProduct />
            )}
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Products;
