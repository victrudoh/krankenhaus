import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";
import AppContext from "../../../../context/AppContext";

// styles
import { Wrapper, Content } from "./SendProducts.Styles";

const SendProducts = () => {
  const {
    leftPanelLoading,
    setLeftPanelLoading,
    getDepartments,
    inventoryProds,
    getPharmacyUnits,
    editInventoryUnit,
    setEditInventoryUnit,
  } = useContext(AppContext);
  console.log(
    "🚀 ~ file: SendProducts.jsx ~ line 20 ~ SendProducts ~ inventoryProds",
    inventoryProds
  );

  const [sendProducts, setSendProducts] = useState({
    name: "",
    brand: "",
    quantity: 0,
  });

  const [quantity, setQuantity] = useState();

  const getAmount = async (name) => {
    if (name) {
      let foundUnit = await inventoryProds.filter((item) => {
        return item.name === name;
      });
      setQuantity(foundUnit[0].quantity);
      // setBrand(foundUnit[0].brand);
      setSendProducts((item) => ({
        ...item,
        brand: foundUnit[0].brand,
      }));
    }
  };

  // // fetch unit when department is selected
  useEffect(() => {
    getAmount(sendProducts.name);
  }, [sendProducts.name]);

  const submit = async (e) => {
    e.preventDefault();
    console.log("sendProducts", sendProducts);
    try {
      setLeftPanelLoading(true);
      const response = await axios.post(
        `https://hospital-ms-api.herokuapp.com/inventory/products/send-to-unit?unit=${editInventoryUnit.unit.id}`,
        sendProducts,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: SendProducts.jsx ~ line 44 ~ submit ~ response",
      //   response
      // );
      setLeftPanelLoading(false);
      if (response.status === 200) {
        success(`Sent products to ${editInventoryUnit.unit.id}`);
        getDepartments();
        getPharmacyUnits();
        // setAddedDept(response.status);
      }
    } catch (err) {
      error("Psych! Couldn't send product");
      console.log(err);
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
    setSendProducts(() => ({
      ...sendProducts,
      [e.target.name]: e.target.value,
    }));
  };

  const cancelEditHandler = () => {
    setEditInventoryUnit({
      action: "add",
      unit: {},
      deptName: "",
    });
  };

  return (
    <>
      <Wrapper>
        <h5>Send Product to Unit</h5>
        <Content>
          {leftPanelLoading ? (
            <>
              <CircleSpinner />
            </>
          ) : (
            <>
              <form onSubmit={submit}>
                <div className="pair">
                  <label>Unit:</label>
                  <h4>{editInventoryUnit.unit.name}</h4>
                </div>
                <div className="pair">
                  <label>Product to Send:</label>
                  <select
                    name="name"
                    id="name"
                    onChange={onchangeHandler}
                    defaultValue={sendProducts.id}
                  >
                    <option>Select Product</option>
                    {inventoryProds.map((item, i) => (
                      <option key={i} value={item.name}>
                        {item.name} ({item.brand})
                      </option>
                    ))}
                  </select>
                </div>

                {/* unit */}
                {sendProducts.name && (
                  <>
                    <label>Available quantity:</label>
                    <h6>{quantity}</h6>
                    {/* sneak in the brand for backend */}
                    <input
                      type="hidden"
                      name="brand"
                      id="brand"
                      onChange={onchangeHandler}
                      defaultValue={sendProducts.brand}
                    />
                  </>
                )}
                <div className="pair">
                  <label>Quantity to Send:</label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    onChange={onchangeHandler}
                    defaultValue={sendProducts.quantity}
                  />
                </div>
                <button>Send to unit</button>
                <button className="mx-3" onClick={cancelEditHandler}>
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

export default SendProducts;
