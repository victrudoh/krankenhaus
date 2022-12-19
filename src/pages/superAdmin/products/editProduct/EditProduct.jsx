import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./EditProduct.Styles";

const EditProduct = () => {
  const {
    leftPanelLoading,
    setLeftPanelLoading,
    departments,
    prodsByDept,
    editProduct,
    setProdsByDept,
    setEditProduct,
  } = useContext(AppContext);

  const [unit, setUnit] = useState([]);
  console.log(
    "🚀 ~ file: EditProduct.jsx ~ line 22 ~ EditProduct ~ unit",
    unit
  );
  const [updateProduct, setUpdateProduct] = useState({
    department: "",
    unit: "",
    name: "",
    price: "",
    NHIS: "",
    publish: "",
  });

  // get products (Called after editing)
  const getProducts = async () => {
    try {
      setLeftPanelLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.onrender.com/products`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProdsByDept(response.data.products);
      // console.log("response.data.products", response.data.products);
      setLeftPanelLoading(false);
    } catch (err) {
      error("Couldn't fetch products");
      console.log(err);
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

  // find product based on index
  const foundProduct = prodsByDept[editProduct.index];

  const submit = async (e) => {
    console.log("updateProduct", updateProduct);
    e.preventDefault();
    try {
      setLeftPanelLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.onrender.com/products/edit?productId=3${foundProduct.id}`,
        updateProduct,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(
        "🚀 ~ file: EditProduct.jsx ~ line 89 ~ submit ~ response",
        response
      );
      setLeftPanelLoading(false);
      if (response.status === 200) {
        success("Updated user successfully");
        // getProducts();
      }
    } catch (err) {
      error("  can't update user");
      console.log(err);
      setLeftPanelLoading(false);
    }
  };

  const quitEditHandler = () => {
    setEditProduct({
      id: "",
      editing: false,
    });
  };

  // fetch unit when department is selected
  useEffect(() => {
    getUnit(updateProduct.department);
  }, [updateProduct]);

  const onchangeHandler = (e) => {
    e.persist();
    setUpdateProduct(() => ({
      ...updateProduct,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setUpdateProduct(() => ({
      ...foundProduct,
    }));
    console.log(updateProduct);
  }, [foundProduct]);

  return (
    <>
      <Wrapper>
        <h5>Edit Product/Service</h5>
        <Content>
          <form onSubmit={submit}>
            <div className="pair">
              <label>Department:</label>
              <select
                name="department"
                id="department"
                required
                onChange={onchangeHandler}
                defaultValue={foundProduct.department}
              >
                <option value="">Select department</option>
                {departments.map((item, i) => (
                  <option key={i} value={item.department.name}>
                    {item.department.name}
                  </option>
                ))}
              </select>
            </div>
            {updateProduct.department && (
              <>
                <div className="pair">
                  <label>Unit:</label>
                  <select
                    name="unit"
                    id="unit"
                    required
                    onChange={onchangeHandler}
                    defaultValue={foundProduct.unit}
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
                onChange={onchangeHandler}
                defaultValue={foundProduct.name}
              />
            </div>
            <div className="pair">
              <label>Price:</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                onChange={onchangeHandler}
                defaultValue={foundProduct.price}
              />
            </div>

            <div className="pair">
              <label>Add NHIS entry? (10% of regular price)</label>
              <select
                name="NHIS"
                id="NHIS"
                onChange={onchangeHandler}
                defaultValue={foundProduct.NHIS}
              >
                <option>Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="pair">
              <label>Publish?</label>
              <select
                name="publish"
                id="publish"
                onChange={onchangeHandler}
                defaultValue={foundProduct.publish}
              >
                <option>Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <button>Update Product/Service</button>
            <button className="mx-3" onClick={quitEditHandler}>
              Cancel
            </button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default EditProduct;
