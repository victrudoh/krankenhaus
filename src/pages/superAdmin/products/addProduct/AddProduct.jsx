import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "../../../../context/AppContext";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./AddProduct.Styles";

const AddProduct = () => {
  const { loading, setLoading, departments } = useContext(AppContext);
  const [unit, setUnit] = useState([]);
  const [newUnit, setNewUnit] = useState({
    department: "",
    unit: "",
    name: "",
    price: "",
    NHIS: "",
    publish: "",
  });

  const addProduct = async (e) => {
    try {
      console.log("newUnit: ", newUnit);
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        "https://hospital-ms-api.herokuapp.com/products/new",
        newUnit,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("~ response", response);
      setLoading(false);
      if (response.status === 200) {
        success("Created new product successfully");
        // setAddedUser(response.status);
        // getUsers();
      }
    } catch (err) {
      error("Psych! couldn't add product");
      console.log(err);
      setLoading(false);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const getUnit = async (name) => {
    if (name) {
      let foundUnit = await departments.filter((item) => {
        return item.department.name === name;
      });
      setUnit(foundUnit[0].units);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewUnit((newUnit) => ({
      ...newUnit,
      [e.target.name]: e.target.value,
    }));
  };

  // fetch departments
  // useEffect(() => {
  //   getDepartments();
  // }, []);

  // // fetch unit when department is selected
  useEffect(() => {
    getUnit(newUnit.department);
  }, [newUnit.department]);

  return (
    <>
      <Wrapper>
        <h5>Add Product/Service</h5>
        <Content>
          {loading ? (
            <CircleSpinner />
          ) : (
            <>
              <form onSubmit={addProduct}>
                <div className="pair">
                  <label>Department:</label>
                  <select
                    name="department"
                    id="department"
                    required
                    onChange={onchangeHandler}
                    defaultValue={newUnit.department}
                  >
                    <option value="">Select department</option>
                    {departments.map((item, i) => (
                      <option key={i} value={item.department.name}>
                        {item.department.name}
                      </option>
                    ))}
                  </select>
                </div>
                {newUnit.department && (
                  <>
                    <div className="pair">
                      <label>Unit:</label>
                      <select
                        name="unit"
                        id="unit"
                        required
                        onChange={onchangeHandler}
                        defaultValue={newUnit.unit}
                      >
                        <option value="">Select unit</option>
                        {unit.map((item, i) => (
                          <option key={i} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <div className="pair">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                    onChange={onchangeHandler}
                    defaultValue={newUnit.name}
                  />
                </div>
                <div className="pair">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                    required
                    onChange={onchangeHandler}
                    defaultValue={newUnit.price}
                  />
                </div>

                <div className="pair">
                  <label>Add NHIS entry? (10% of regular price)</label>
                  <select
                    name="NHIS"
                    id="NHIS"
                    required
                    onChange={onchangeHandler}
                    defaultValue={newUnit.NHIS}
                  >
                    <option>Select option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="pair">
                  <label>Publish?</label>
                  <select
                    name="publish"
                    id="publish"
                    required
                    onChange={onchangeHandler}
                    defaultValue={newUnit.publish}
                  >
                    <option>Select option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <button>Add Product/Service</button>
              </form>
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default AddProduct;
