import React, { useState } from "react";

// Styles
import { Wrapper } from "./Products.Styles";

// components
import ProductList from "./productList/ProductList";
import ProductByUnit from "./productByUnit/ProductByUnit";
import AddProduct from "./addProduct/AddProduct";
import EditProduct from "./editProduct/EditProduct";

const Products = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [byUnit, setByUnit] = useState(false); //for view product by unit

  return (
    <>
      <Wrapper>
        {byUnit ? (
          <ProductByUnit setByUnit={setByUnit} />
        ) : (
          <ProductList setByUnit={setByUnit} setIsEditing={setIsEditing} />
        )}

        {isEditing ? (
          <>
            <EditProduct setIsEditing={setIsEditing} />
          </>
        ) : (
          <AddProduct />
        )}
      </Wrapper>
    </>
  );
};

export default Products;
