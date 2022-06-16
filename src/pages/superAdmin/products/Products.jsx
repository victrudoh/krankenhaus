import React, { useState } from "react";

// Styles
import { Wrapper } from "./Products.Styles";

// components
import ProductList from "./productList/ProductList";
import AddProduct from "./addProduct/AddProduct";
import EditProduct from "./editProduct/EditProduct";

const Products = ({ setTitle }) => {
  setTitle("Products");

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Wrapper>
        <ProductList setIsEditing={setIsEditing} />
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
