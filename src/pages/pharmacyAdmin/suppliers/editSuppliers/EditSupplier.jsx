import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// styles
import { Wrapper, Content } from "./EditSupplier.Styles";

const EditSupplier = () => {
  const {
    loading,
    setLoading,
    editSupplier,
    setEditSupplier,
    inventorySuppliers,
    getInventorySuppliers,
  } = useContext(AppContext);

  const [updateSupplier, setUpdateSupplier] = useState({
    name: "",
    contact: "",
    account: "",
    address: "",
  });

  //   find supplier
  const foundSupplier = inventorySuppliers[editSupplier.index];

  const submit = async (e) => {
    // console.log("updateSupplier", updateSupplier);
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.onrender.com/inventory/suppliers/edit?id=${foundSupplier.id}`,
        updateSupplier,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success("Updated supplier successfully");
        setEditSupplier({
          index: "",
          editing: false,
        });
        getInventorySuppliers();
      }
    } catch (err) {
      error("  can't update supplier");
      console.log(err);
      setLoading(false);
    }
  };

  // onclick "cancel"
  const quitEditHandler = () => {
    setEditSupplier({
      index: "",
      editing: false,
    });
  };

  const onchangeHandler = (e) => {
    e.persist();
    setUpdateSupplier((updateSupplier) => ({
      ...updateSupplier,
      [e.target.name]: e.target.value,
    }));
  };

  // populate fields
  useEffect(() => {
    setUpdateSupplier(() => ({
      ...foundSupplier,
    }));
    // console.log(updateSupplier);
  }, [foundSupplier]);

  return (
    <>
      <Wrapper>
        <h5>Edit User</h5>
        <Content>
          <form onSubmit={submit}>
            <div className="pair">
              <label>Supplier ame:</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Supplier name"
                onChange={onchangeHandler}
                defaultValue={foundSupplier.name}
              />
            </div>
            <div className="pair">
              <label>Supplier contact:</label>
              <input
                type="text"
                name="contact"
                id="contact"
                required
                placeholder="Supplier contact"
                onChange={onchangeHandler}
                defaultValue={foundSupplier.contact}
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
                defaultValue={foundSupplier.account}
              />
            </div>
            <div className="pair">
              <label>Supplier Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                required
                placeholder="Supplier Address"
                onChange={onchangeHandler}
                defaultValue={foundSupplier.address}
              />
            </div>
            {loading ? (
              <CircleSpinner />
            ) : (
              <>
                <button type="submit">Update supplier</button>
                <button className="mx-3" onClick={quitEditHandler}>
                  Cancel
                </button>
              </>
            )}
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default EditSupplier;
