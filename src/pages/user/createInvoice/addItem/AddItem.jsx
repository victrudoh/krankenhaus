import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import AppContext from "../../../../context/AppContext";

// styles
import { Wrapper, Content, List, ManualAdd } from "./AddItem.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const AddItem = () => {
  const {
    leftPanelLoading,
    setLeftPanelLoading,
    invoiceUser,
    setInvoiceUser,
    prodsByPriv,
  } = useContext(AppContext);

  const [newItem, setNewItem] = useState({
    id: 0,
    department: "",
    name: "",
    quantity: 1,
    price: 0,
  });

  const [deptByPriv, setDeptByPriv] = useState([]);
  const [deptId, setDeptId] = useState();
  const [item, setItem] = useState([]);

  // For search functionality
  const [showList, setShowList] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [autoPopulate, setAutoPopulate] = useState([]);

  // for manually adding items
  const [manuallyAddItem, setManuallyAddItem] = useState(false);

  // get department by privilege
  const getDeptByPriv = async () => {
    try {
      const response = await axios.get(
        "https://hospital-ms-api.herokuapp.com/departments/find-By-dept",
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("getDeptByPriv ~ response", response);
      if (response.status === 200) {
        setDeptByPriv(response.data.departments);
      }
    } catch (err) {
      error("Couldn't fetch departments");
      console.log(err);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // get products in department
  const getDeptId = async (id) => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/products/departments?departmentId=${deptId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("getDeptId ~ response", response);
      setItem(response.data.products);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // ADD ITEM
  const addItem = async (e) => {
    console.log("newItem", newItem);
    e.preventDefault();
    try {
      setLeftPanelLoading(true);
      const response = await axios.post(
        "https://hospital-ms-api.herokuapp.com/transactions/add-item",
        newItem,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLeftPanelLoading(false);
      // console.log("response", response);
      if (response.status === 200) {
        success("Added new item");
        const itemExists = invoiceUser.items.filter((item) =>
          item.name.includes(response.data.item.name)
        );
        if (itemExists) {
          // Add quantity of new item to existing item
          // setInvoiceUser(() => ({
          //   ...invoiceUser,
          //   [invoiceUser.items.quantity]: [
          //     invoiceUser.items.quantity + response.data.item.quantity,
          //   ],
          // }));
          // console.log("InvoiceUser After: ", invoiceUser);
        }
        setInvoiceUser(() => ({
          ...invoiceUser,
          items: [...invoiceUser.items, response.data.item],
        }));
      }
    } catch (err) {
      error(" , couldn't add item");
      console.log(err);
      setLeftPanelLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewItem((newItem) => ({
      ...newItem,
      [e.target.name]: e.target.value,
    }));
  };

  // select department
  const onDeptChangeHandler = (e) => {
    e.persist();
    // Set new item
    setNewItem((newItem) => ({
      ...newItem,
      [e.target.name]: e.target.value,
    }));
    // Get ID
    deptByPriv.map((item) => {
      if (item.name === e.target.value) {
        setDeptId(item.id);
      }
    });
    // deptByPriv.filter((item) => {
    //   item.name.includes(e.target.value);
    //   setDeptId(item.id);
    // });
  };

  // select item and set name, price and Id
  const onItemSelectHandler = (e) => {
    e.persist();
    const getItem = item.filter((i) => i.name.includes(e.target.value));
    setNewItem(() => ({
      ...newItem,
      name: e.target.value,
      id: getItem[0].id,
      price: getItem[0].price,
    }));
  };

  // Search product Handler
  const onSearchCangeHandler = async (e) => {
    try {
      e.preventDefault();
      if (e.target.value.length < 1) {
        setShowList(false);
        setAutoPopulate([]);
      } else {
        setShowList(true);
      }
      const filteredProducts = prodsByPriv.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      setFiltered(filteredProducts);
    } catch (err) {
      return err;
    }
  };

  // on search select handler
  const onSearchSelectHandler = async (item) => {
    try {
      setShowList(false);
      setAutoPopulate(item);
    } catch (error) {
      console.log(
        "🚀 ~ file: AddItem.jsx ~ line 190 ~ onSearchSelectHandler ~ error",
        error
      );
    }
  };

  // clear newItem state on select mode change
  const onModeChangeHandler = async () => {
    setManuallyAddItem(!manuallyAddItem);
    setAutoPopulate([]);
    setNewItem({
      id: 0,
      department: "",
      name: "",
      quantity: 1,
      price: 0,
    });
  };

  useEffect(() => {
    getDeptByPriv();
  }, []);

  useEffect(() => {
    getDeptId();
  }, [deptId]);

  // set state after auto populate
  useEffect(() => {
    setNewItem({
      id: autoPopulate.id,
      department: "",
      name: autoPopulate.name,
      quantity: 1,
      price: autoPopulate.price,
    });
  }, [autoPopulate]);

  return (
    <>
      <Wrapper>
        <h5>Add item</h5>
        <Content>
          {leftPanelLoading ? (
            <CircleSpinner />
          ) : (
            <form onSubmit={addItem}>
              <ManualAdd onClick={onModeChangeHandler}>
                {!manuallyAddItem ? (
                  <>Manually Select Item</>
                ) : (
                  <>Automatically Select Item</>
                )}
              </ManualAdd>
              {!manuallyAddItem ? (
                <>
                  <div className="pair">
                    <label>Auto add product:</label>
                    <input
                      type="text"
                      name="directProduct"
                      id="directProduct"
                      placeholder="Enter product name"
                      onChange={onSearchCangeHandler}
                      defaultValue={newItem.userName}
                    />
                  </div>
                  {showList && (
                    <List>
                      <ul>
                        {filtered.length < 1 ? (
                          <li>No Match found</li>
                        ) : (
                          filtered.map((item, i) => (
                            <li
                              key={i}
                              onClick={() => onSearchSelectHandler(item)}
                            >
                              {item.name}
                            </li>
                          ))
                        )}
                      </ul>
                    </List>
                  )}
                  {autoPopulate.length !== 0 && (
                    <>
                      <div className="pair">
                        <label>Item:</label>
                        <h5 className="mx-1">{autoPopulate.name}</h5>
                      </div>
                      {/* <div className="pair">
                    <label>Price:</label>
                    <h5 className="mx-1">{autoPopulate.price}</h5>
                  </div>
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
                  </div> */}
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="pair">
                    <label>Department:</label>
                    <select
                      name="department"
                      id="department"
                      // required
                      onChange={onDeptChangeHandler}
                      defaultValue={newItem.department}
                    >
                      <option value="">Select department</option>
                      {deptByPriv.map((item, i) => (
                        <option key={i} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {newItem.department && (
                    <>
                      <div className="pair">
                        <label>Item:</label>
                        <select
                          name="name"
                          id="name"
                          // required
                          onChange={onItemSelectHandler}
                          defaultValue={newItem.name}
                        >
                          <option value="">Select item</option>
                          {item.map((item, i) => (
                            <option key={i} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </>
              )}
              {newItem.name && (
                <>
                  <div className="pair">
                    <label>Price:</label>
                    <h5 className="mx-1">{newItem.price}</h5>
                  </div>
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
                </>
              )}
              <button type="submit">Add item</button>
            </form>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default AddItem;
