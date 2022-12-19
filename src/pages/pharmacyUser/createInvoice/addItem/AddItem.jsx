import React, { useState, useContext } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import AppContext from "../../../../context/AppContext";

// styles
import { Wrapper, Content } from "./AddItem.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const AddItem = () => {
  const {
    leftPanelLoading,
    setLeftPanelLoading,
    invoiceUser,
    setInvoiceUser,
    inventoryAcceptedProducts,
  } = useContext(AppContext);

  const [newItem, setNewItem] = useState({
    id: 0,
    department: "",
    name: "",
    quantity: 1,
    price: 0,
  });

  const addItem = async (e) => {
    console.log("newItem", newItem);
    e.preventDefault();
    try {
      setLeftPanelLoading(true);
      const response = await axios.post(
        `https://hospital-ms-api.onrender.com/inventory/products/item/add?name=${newItem.name}&quantity=${newItem.quantity}`,
        {},
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: AddItem.jsx ~ line 101 ~ addItem ~ response",
      //   response
      // );
      setLeftPanelLoading(false);
      if (response.status === 200) {
        // success("Added new item");
        setInvoiceUser(() => ({
          ...invoiceUser,
          items: [...invoiceUser.items, response.data.item],
        }));
      }
    } catch (err) {
      error("Couldn't add item");
      console.log(err);
      setLeftPanelLoading(false);
      if (err.response.status === 401) {
        error("Please Log in");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewItem((newItem) => ({
      ...newItem,
      [e.target.name]: e.target.value,
    }));
  };

  // select item and set name, price and Id
  const onItemSelectHandler = async (e) => {
    e.persist();
    const getItem = await inventoryAcceptedProducts.filter((i) =>
      i.name.includes(e.target.value)
    );
    setNewItem(() => ({
      ...newItem,
      name: e.target.value,
      id: getItem[0].id,
      price: getItem[0].sellPrice,
    }));
  };

  return (
    <>
      <Wrapper>
        <h5>Add item</h5>
        <Content>
          {leftPanelLoading ? (
            <CircleSpinner />
          ) : (
            <form onSubmit={addItem}>
              <div className="pair">
                <label>Item:</label>
                <select
                  name="name"
                  id="name"
                  required
                  onChange={onItemSelectHandler}
                  defaultValue={newItem.name}
                >
                  <option value="">Select item</option>
                  {inventoryAcceptedProducts.map((item, i) => (
                    <option key={i} value={item.name}>
                      {item.name} {item.brand} - {item.quantity}
                    </option>
                  ))}
                </select>
              </div>
              {newItem.name && (
                <>
                  <div className="pair">
                    <h5 className="my-2">Price: ₦{newItem.price}</h5>
                  </div>
                </>
              )}
              <div className="pair">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  required
                  placeholder="Quantity"
                  onChange={onchangeHandler}
                  defaultValue={newItem.quantity}
                />
              </div>
              <button type="submit">Add item</button>
            </form>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default AddItem;
