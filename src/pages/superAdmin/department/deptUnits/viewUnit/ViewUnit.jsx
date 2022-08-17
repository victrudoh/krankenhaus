import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../../../context/AppContext";
import { success, error } from "../../../../../helpers/Alert";
import axios from "axios";

// Styles
import { Wrapper, Top, Head } from "./ViewUnit.Styles";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const ViewUnit = () => {
  const { savedDeptName, loading, setLoading, prodsByUnit, setProdsByUnit } =
    useContext(AppContext);

  console.log(
    "🚀 ~ file: ViewUnit.jsx ~ line 13 ~ ViewUnit ~ prodsByUnit",
    prodsByUnit
  );

  const [units, setUnits] = useState([]);
  const [sortParams, setSortParams] = useState({
    unit: "",
  });

  let SN = 0;

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
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const getProducts = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/products/units?unitId=${sortParams.unit}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(
        "🚀 ~ file: ViewUnit.jsx ~ line 63 ~ getProducts ~ response",
        response
      );
      setLoading(false);
      if (response.status === 200) {
        success("fetched products successfully");
        setProdsByUnit(response.data);
      }
    } catch (err) {
      console.log("🚀 ~ file: ViewUnit.jsx ~ line 71 ~ getProducts ~ err", err);
      error("Couldn't fetch products");
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
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
          <i className="bx bx-x-circle" onClick={goBack}></i>
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
                {prodsByUnit.length < 1 ? (
                  <tr>
                    <th></th>
                    <th></th>
                    <th>No products to show</th>
                    <th></th>
                    <th></th>
                  </tr>
                ) : (
                  <>
                    {prodsByUnit.products.map((item, i) => (
                      <tr key={i}>
                        <th scope="row">{(SN = SN + 1)}</th>
                        <td>{savedDeptName}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.publish ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </>
                )}
                {/* <tr>
                  <th scope="row">1</th>
                  <td>Admin</td>
                  <td>Chest Tube-Insertion</td>
                  <td>7000.00</td>
                  <td>No</td>
                </tr> */}
              </tbody>
            </table>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ViewUnit;
