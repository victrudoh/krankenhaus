import axios from "axios";
import React, { useContext, useState } from "react";
import AppContext from "../../../../context/AppContext";
import { error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Top } from "./ProductList.Styles";

const ProductList = () => {
  const {
    user,
    loading,
    setLoading,
    departments,
    prodsByDept,
    setProdsByDept,
    setEditProduct,
    setDisplayByUnit,
  } = useContext(AppContext);
  console.log(
    "🚀 ~ file: ProductList.jsx ~ line 21 ~ ProductList ~ user",
    user
  );

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
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Department</th>
                  <th scope="col">Product/Service</th>
                  <th scope="col">Price</th>
                  <th scope="col">Publish</th>
                  {user.role !== "super-admin" && <th scope="col">Action</th>}
                </tr>
              </thead>
              <tbody>
                {prodsByDept.length < 1 ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td colSpan={2}>No products to show</td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  <>
                    {prodsByDept.map((item, i) => (
                      <tr key={i}>
                        <th scope="row">{(SN = SN + 1)}</th>
                        <td>{item.department}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.publish ? "Yes" : "No"}</td>
                        {user.role !== "super-admin" && (
                          <td>
                            <button onClick={() => editHandler(i)}>Edit</button>
                          </td>
                        )}
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
