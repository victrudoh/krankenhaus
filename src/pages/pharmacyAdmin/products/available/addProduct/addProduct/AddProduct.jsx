import React, { useContext, useState } from "react";
import axios from "axios";
import AppContext from "../../../../../../context/AppContext";
import { success, error } from "../../../../../../helpers/Alert";
import { CircleSpinner } from "../../../../../../components/circleSpinner/CircleSpinner.Styles";

// styles
import { Wrapper, Content } from "./AddProduct.Styles";

const AddProduct = () => {
  const {
    leftPanelLoading,
    setLeftPanelLoading,
    setInventoryProds,
    inventorySuppliers,
    inventoryMeasuringUnit,
  } = useContext(AppContext);

  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    supplier: "",
    quantity: 0,
    costPrice: 0,
    sellPrice: 0,
    measuringUnit: "",
    expiryDate: "",
    daysToExpire: 0,
  });

  const addProduct = async (e) => {
    try {
      // console.log("newProduct: ", newProduct);
      e.preventDefault();
      setLeftPanelLoading(true);
      const response = await axios.post(
        "https://hospital-ms-api.onrender.com/inventory/products/add",
        newProduct,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLeftPanelLoading(false);
      if (response.status === 200) {
        success("Created new product successfully");
        setInventoryProds(response.data.product);
      }
    } catch (err) {
      error("  couldn't add product");
      // console.log(err);
      setLeftPanelLoading(false);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewProduct(() => ({
      ...newProduct,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        <h5>Add Product</h5>
        <Content>
          {leftPanelLoading ? (
            <CircleSpinner />
          ) : (
            <>
              <form onSubmit={addProduct}>
                <div className="pair">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                    onChange={onchangeHandler}
                    defaultValue={newProduct.name}
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
                    defaultValue={newProduct.brand}
                  />
                </div>
                {/* supplier */}
                <div className="pair">
                  <label>Supplier:</label>
                  <select
                    name="supplier"
                    id="supplier"
                    required
                    onChange={onchangeHandler}
                    defaultValue={newProduct.supplier}
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
                    defaultValue={newProduct.quantity}
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
                    defaultValue={newProduct.costPrice}
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
                    defaultValue={newProduct.sellPrice}
                  />
                </div>

                <div className="pair">
                  <label>Measuring Unit</label>
                  <select
                    name="measuringUnit"
                    id="measuringUnit"
                    required
                    onChange={onchangeHandler}
                    defaultValue={newProduct.measuringUnit}
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
                    defaultValue={newProduct.expiryDate}
                  />
                </div>
                <div className="pair">
                  <label>Days to Expiration Alert: </label>
                  <input
                    type="number"
                    name="daysToExpire"
                    id="daysToExpire"
                    placeholder="Days before expiration alert"
                    required
                    onChange={onchangeHandler}
                    defaultValue={newProduct.daysToExpire}
                  />
                </div>
                <button type="submit">Add Product</button>
              </form>
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default AddProduct;
