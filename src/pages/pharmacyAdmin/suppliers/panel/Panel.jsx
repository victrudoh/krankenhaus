import React, { useState, useContext } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import AppContext from "../../../../context/AppContext";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// styles
import { Content, Wrapper } from "./Panel.Styles";

const Panel = () => {
  const { loading, setLoading, getInventorySuppliers } = useContext(AppContext);

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    account: "",
    address: "",
  });

  const addSupplier = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hospital-ms-api.onrender.com/inventory/suppliers/new",
        newSupplier,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success("Created new supplier successfully");
        getInventorySuppliers();
      }
    } catch (err) {
      error("Couldn't add supplier");
      console.log(err);
      setLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewSupplier((newSupplier) => ({
      ...newSupplier,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        <h5>Add Supplier</h5>
        <Content>
          {loading ? (
            <CircleSpinner />
          ) : (
            <form onSubmit={addSupplier}>
              {/* name */}
              <div className="pair">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Name"
                  onChange={onchangeHandler}
                  defaultValue={newSupplier.name}
                />
              </div>
              {/* contact */}
              <div className="pair">
                <label>Contact:</label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  required
                  placeholder="Contact"
                  onChange={onchangeHandler}
                  defaultValue={newSupplier.contact}
                />
              </div>
              <div className="pair">
                <label>Account Details:</label>
                <input
                  type="text"
                  name="account"
                  id="account"
                  required
                  placeholder="Account Details"
                  onChange={onchangeHandler}
                  defaultValue={newSupplier.account}
                />
              </div>
              {/* address */}
              <div className="pair">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  placeholder="Address"
                  onChange={onchangeHandler}
                  defaultValue={newSupplier.address}
                />
              </div>
              <button type="submit">Add Supplier</button>
            </form>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default Panel;
