import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../context/AppContext";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Top } from "./ProductList.Styles";

const ProductList = () => {
  const {
    loading,
    setLoading,
    departments,
    prodsByDept,
    setProdsByDept,
    setEditProduct,
    setDisplayByUnit,
  } = useContext(AppContext);

  const [sortBy, setSortBy] = useState("");

  let SN = 0;

  const foundDept = departments.filter((item) => {
    return item.department.name.includes(sortBy);
  });

  // get products
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/products/departments?departmentId=${foundDept[0].department.id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProdsByDept(response.data.products);
      // console.log("response.data.products", response.data.products);
      setLoading(false);
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

  const editHandler = (i) => {
    setEditProduct({
      index: i,
      editing: true,
    });
  };

  const onchangeHandler = (e) => {
    e.persist();
    console.log(e.target.value);
    setSortBy(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setDisplayByUnit(true)}>View by units</button>
          <form onSubmit={getProducts}>
            <div className="pair">
              <label>Sort by department:</label>
              <select
                name="department"
                id="department"
                required
                onChange={onchangeHandler}
                defaultValue="select Department"
              >
                <option value="">Select department</option>
                {departments.map((item, i) => (
                  <option key={i} value={item.department.name}>
                    {item.department.name}
                  </option>
                ))}
              </select>
              <button type="submit">Sort</button>
            </div>
          </form>
        </Top>
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Department</th>
                  <th scope="col">Product/Service</th>
                  <th scope="col">Price</th>
                  <th scope="col">Publish</th>
                </tr>
              </thead>
              <tbody>
                {prodsByDept.length < 1 ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td>No products to show</td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  <>
                    {prodsByDept.map((item, i) => (
                      <tr key={i} onClick={() => editHandler(i)}>
                        <th scope="row">{(SN = SN + 1)}</th>
                        <td>{foundDept[0].department.name}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.publish ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ProductList;
