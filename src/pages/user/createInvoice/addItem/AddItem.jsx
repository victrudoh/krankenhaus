import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import AppContext from "../../../../context/AppContext";

// styles
import { Wrapper, Content } from "./AddItem.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const AddItem = () => {
  const { loading, setLoading, setInvoiceUser } = useContext(AppContext);

  const [newItem, setNewItem] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    department: "",
    item: "",
    quantity: 1,
    price: 0,
  });

  const [deptByPriv, setDeptByPriv] = useState([]);
  const [deptId, setDeptId] = useState();
  const [item, setItem] = useState([]);
  console.log("item", item);
  const [price, setPrice] = useState();

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

  const addItem = async (e) => {
    console.log("newItem", newItem);
    e.preventDefault();
    try {
      setLoading(true);
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
      setLoading(false);
      console.log("response", response);
      if (response.status === 200) {
        success("Added new item");
        setInvoiceUser((item) => ({
          ...item,
          items: [response.data.item],
        }));
      }
    } catch (err) {
      error("Psych");
      console.log(err);
      setLoading(false);
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
    deptByPriv.filter((item) => {
      item.name.includes(e.target.value);
      setDeptId(item.id);
    });
  };

  // select item
  const onItemSelectHandler = (e) => {
    e.persist();
    setNewItem((newItem) => ({
      ...newItem,
      [e.target.name]: e.target.value,
    }));
    item.filter((item) => {
      item.name.includes(e.target.value);
      setPrice(item.price);
      setNewItem((newItem) => ({
        ...newItem,
        id: item.id,
      }));
    });
  };

  useEffect(() => {
    getDeptByPriv();
  }, []);

  useEffect(() => {
    getDeptId();
  }, [deptId]);

  return (
    <>
      <Wrapper>
        <h5>Add item</h5>
        <Content>
          {loading ? (
            <CircleSpinner />
          ) : (
            <form onSubmit={addItem}>
              {/* <div className="pair">
                <label>First name:</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  placeholder="First name"
                  onChange={onchangeHandler}
                  defaultValue={newItem.firstName}
                />
              </div>
              <div className="pair">
                <label>Last name:</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  placeholder="last name"
                  onChange={onchangeHandler}
                  defaultValue={newItem.lastName}
                />
              </div> */}
              <div className="pair">
                <label>Auto add product:</label>
                <input
                  type="text"
                  name="directProduct"
                  id="directProduct"
                  placeholder="Enter product name"
                  onChange={onchangeHandler}
                  // defaultValue={newItem.userName}
                />
              </div>
              <div className="pair">
                <label>Department:</label>
                <select
                  name="department"
                  id="department"
                  required
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
                      name="item"
                      id="item"
                      required
                      onChange={onItemSelectHandler}
                      defaultValue={newItem.item}
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
              {newItem.item && (
                <>
                  <div className="pair">
                    <label>Price:</label>
                    <h5 className="mx-1">{price}</h5>
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
