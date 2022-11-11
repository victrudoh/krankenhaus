import React, { useContext, useState } from "react";
import AppContext from "../../../../context/AppContext";
import { success, error } from "../../../../helpers/Alert";
import axios from "axios";

// Styles
import { Wrapper, Top } from "./ProductByUnit.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const ProductByUnit = () => {
  const {
    loading,
    setLoading,
    prodsByUnit,
    departments,
    setProdsByUnit,
    setDisplayByUnit,
  } = useContext(AppContext);

  const [unit, setUnit] = useState({
    unitId: "",
  });

  let SN = 0;

  const getProducts = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/products/units?unitId=${unit.unitId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      // console.log(
      //   "🚀 ~ file: ProductByUnit.jsx ~ line 31 ~ getProducts ~ response",
      //   response
      // );
      if (response.status === 200) {
        success("Fetched products successfully");
        setProdsByUnit(response.data.products);
      }
    } catch (err) {
      error("couldn't fetch products");
      console.log(err);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setUnit(() => ({
      ...unit,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        <Top>
          <button onClick={() => setDisplayByUnit(false)}>
            View by departments
          </button>
          <div className="pair">
            <label>Select a unit:</label>
            <form onSubmit={getProducts}>
              <select
                name="unitId"
                id="unitId"
                onChange={onchangeHandler}
                defaultValue={unit.unitId}
              >
                <option>Select Unit</option>
                {departments.map((item, i) =>
                  item.units.map((unit, i) => (
                    <option key={i} value={unit.id}>
                      {unit.name}
                    </option>
                  ))
                )}
              </select>
              <button type="submit">Sort</button>
            </form>
          </div>
        </Top>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table table-striped">
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
              {prodsByUnit.length < 1 ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td>No products to show</td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                <>
                  {prodsByUnit?.map((item, i) => (
                    <tr key={i}>
                      <th scope="row">{(SN = SN + 1)}</th>
                      <td>{item.department}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.publish === true ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default ProductByUnit;
