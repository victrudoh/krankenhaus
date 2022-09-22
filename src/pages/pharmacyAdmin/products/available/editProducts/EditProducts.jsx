import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../../context/AppContext";
import { success, error } from "../../../../../helpers/Alert";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";
import axios from "axios";

//styles
import { Wrapper, Content } from "./EditProducts.Styles";

const EditProducts = () => {
  const {
    loading,
    setLoading,
    inventorySuppliers,
    getInventoryProducts,
    editInventoryProduct,
    inventoryMeasuringUnit,
    setEditInventoryProduct,
  } = useContext(AppContext);

  const [updateProducts, setUpdateProducts] = useState({
    name: "",
    brand: "",
    supplier: "",
    quantity: 0,
    costPrice: 0,
    sellPrice: 0,
    measuringUnit: "",
    expiryDate: "",
  });

  const submit = async (e) => {
    // console.log("updateProducts", updateProducts);
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.herokuapp.com/inventory/products/edit?id=${editInventoryProduct.product.id}`,
        updateProducts,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success("Updated product successfully");
        setEditInventoryProduct({
          product: "",
          action: "",
        });
        getInventoryProducts();
      }
    } catch (err) {
      error("Psych! can't update Product");
      console.log(err);
      setLoading(false);
    }
  };

  // onclick "cancel"
  const quitEditHandler = () => {
    setEditInventoryProduct({
      product: "",
      action: "",
    });
  };

  const onchangeHandler = (e) => {
    e.persist();
    setUpdateProducts((item) => ({
      ...item,
      [e.target.name]: e.target.value,
    }));
  };

  // populate fields
  useEffect(() => {
    setUpdateProducts(() => ({
      ...editInventoryProduct.product,
    }));
  }, []);

  return (
    <>
      <Wrapper>
        <h5>Edit Product</h5>
        <Content>
          {loading ? (
            <CircleSpinner />
          ) : (
            <>
              <form onSubmit={submit}>
                <div className="pair">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                    onChange={onchangeHandler}
                    defaultValue={editInventoryProduct.product.name}
                  />
                </div>
                <div className="pair">
                  <label>Brand:</label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    placeholder="Brand"
                    required
                    onChange={onchangeHandler}
                    defaultValue={editInventoryProduct.product.brand}
                  />
                </div>
                <div className="pair">
                  <label>Supplier:</label>
                  <select
                    name="supplier"
                    id="supplier"
                    required
                    onChange={onchangeHandler}
                    defaultValue={editInventoryProduct.product.supplier}
                  >
                    <option>Select supplier</option>
                    {inventorySuppliers.map((item, i) => (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pair">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Quantity"
                    required
                    onChange={onchangeHandler}
                    defaultValue={editInventoryProduct.product.quantity}
                  />
                </div>
                <div className="pair">
                  <label>Cost Price:</label>
                  <input
                    type="number"
                    name="costPrice"
                    id="costPrice"
                    placeholder="Cost Price"
                    required
                    onChange={onchangeHandler}
                    defaultValue={editInventoryProduct.product.costPrice}
                  />
                </div>
                <div className="pair">
                  <label>Sell Price:</label>
                  <input
                    type="number"
                    name="sellPrice"
                    id="sellPrice"
                    placeholder="Sell Price"
                    required
                    onChange={onchangeHandler}
                    defaultValue={editInventoryProduct.product.sellPrice}
                  />
                </div>

                <div className="pair">
                  <label>Measuring Unit</label>
                  <select
                    name="measuringUnit"
                    id="measuringUnit"
                    required
                    onChange={onchangeHandler}
                    defaultValue={editInventoryProduct.product.measuringUnit}
                  >
                    <option>Select option</option>
                    {inventoryMeasuringUnit.map((item, i) => (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pair">
                  <label>Expiry Date:</label>
                  <input
                    type="date"
                    name="expiryDate"
                    id="expiryDate"
                    placeholder="Expiry Date"
                    required
                    onChange={onchangeHandler}
                    defaultValue={editInventoryProduct.product.expiryDate}
                  />
                </div>
                <button type="submit">Edit Product</button>
                <button className="mx-3" onClick={quitEditHandler}>
                  Cancel
                </button>
              </form>
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default EditProducts;
