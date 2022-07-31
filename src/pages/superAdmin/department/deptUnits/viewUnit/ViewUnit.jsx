import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../../../context/AppContext";
import { success, error } from "../../../../../helpers/Alert";
import axios from "axios";

// Styles
import { Wrapper, Top, Head } from "./ViewUnit.Styles";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const ViewUnit = () => {
  const { savedDeptName, loading, setLoading } = useContext(AppContext);

  const [units, setUnits] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortParams, setSortParams] = useState({
    unit: "",
  });

  // Navigate back
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/superadmin/deptunits");
  };

  const getUnits = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/departments/units?name=${savedDeptName}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        success("fetched units successfully");
        setUnits(response.data.units);
      }
    } catch (err) {
      error("Couldn't fetch units");
    }
  };

  const getProducts = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/products/units?unitId=${savedDeptName}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success("fetched products successfully");
        setProducts(response.data.units);
      }
    } catch (err) {
      error("Couldn't fetch products");
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setSortParams(() => ({
      ...sortParams,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getUnits();
  }, []);

  return (
    <>
      <Wrapper>
        <Head>
          <h4 className="mx-e">Products/Services by Units</h4>
          <i class="bx bx-x-circle" onClick={goBack}></i>
        </Head>
        <hr />
        <Top>
          <div className="pair">
            <form onSubmit={getProducts}>
              <label className="mx-3">Select a unit:</label>
              <select
                name="unit"
                id="unit"
                onChange={onchangeHandler}
                defaultValue={sortParams.unit}
              >
                <option>Select Unit</option>
                {units.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit">Sort</button>
            </form>
          </div>
        </Top>
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
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
                {products.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">1</th>
                    <td>A&E</td>
                    <td>Back slaps</td>
                    <td>4000.00</td>
                    <td>Yes</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">1</th>
                  <td>Admin</td>
                  <td>Chest Tube-Insertion</td>
                  <td>7000.00</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ViewUnit;
