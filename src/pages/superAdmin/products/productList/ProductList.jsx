import axios from "axios";
import React, { useContext, useState } from "react";
import AppContext from "../../../../context/AppContext";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Top } from "./ProductList.Styles";

const ProductList = ({ setIsEditing, setByUnit }) => {
  const { loading, setLoading, departments, prodsByDept, setProdsByDept } =
    useContext(AppContext);

  console.log("~ prodsByDept", prodsByDept);
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
      console.log("response.data.products", response.data.products);
      setLoading(false);
    } catch (err) {
      // error(err.response.data.message);
      console.log(err);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const editHandler = () => {
    setIsEditing(true);
    // collect user ID and pass it to the edit page, use state to carry the ID or something
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
          <button onClick={() => setByUnit(true)}>View by units</button>
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
                  {/* <th scope="col">Department</th> */}
                  <th scope="col">Product/Service</th>
                  <th scope="col">Price</th>
                  <th scope="col">Publish</th>
                </tr>
              </thead>
              <tbody>
                {prodsByDept.length < 1 ? (
                  <tr>
                    <td colSpan={4}>
                      <h6>No Products to show</h6>
                    </td>
                  </tr>
                ) : (
                  <>
                    {prodsByDept.map((item, i) => (
                      <tr key={i} onClick={editHandler}>
                        <th scope="row">{(SN = SN + 1)}</th>
                        {/* <td>{item.department}</td> */}
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
