import React, { useContext, useState } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";
import AppContext from "../../../../context/AppContext";

// styles
import { Wrapper, Content } from "./SendProducts.Styles";

const SendProducts = () => {
  const {
    loading,
    setLoading,
    getDepartments,
    inventoryProds,
    getPharmacyUnits,
    editInventoryUnit,
    setEditInventoryUnit,
  } = useContext(AppContext);

  const [sendProducts, setSendProducts] = useState({
    name: "",
    quantity: 0,
  });

  const submit = async (e) => {
    e.preventDefault();
    console.log("sendProducts", sendProducts);
    try {
      setLoading(true);
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
      setLoading(false);
      if (response.status === 200) {
        success(`Sent products to ${editInventoryUnit.unit.id}`);
        getDepartments();
        getPharmacyUnits();
        // setAddedDept(response.status);
      }
    } catch (err) {
      error("Psych! Couldn't send product");
      console.log(err);
      setLoading(false);
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
          {loading ? (
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
                {/* <div className="pair">
                  <label>Account:</label>
                  <input
                    type="text"
                    name="account"
                    id="account"
                    placeholder="Account Details"
                    onChange={onchangeHandler}
                    defaultValue={sendProducts.account}
                  />
                </div> */}
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
                        {item.name} : {item.quantity} available
                      </option>
                    ))}
                  </select>
                </div>
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
