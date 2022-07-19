import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";
import { success, error } from "../../../../../helpers/Alert";

const Panel = () => {
  const { users, loading, setLoading, setInvoiceProducts } =
    useContext(AppContext);

  // const [deptByPriv, setDeptByPriv] = useState([]);
  // const [tellers, setTellers] = useState([]);
  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
    status: "",
  });
  console.log("filterParams", filterParams);

  // // get department by privilege
  // const getDeptByPriv = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://hospital-ms-api.herokuapp.com/departments/find-By-dept",
  //       {
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     // console.log("getDeptByPriv ~ response", response);
  //     if (response.status === 200) {
  //       setDeptByPriv(response.data.departments);
  //     }
  //   } catch (err) {
  //     error("Couldn't fetch departments");
  //     console.log(err);
  //     if (err.response.status === 401) {
  //       error("Unauthorized");
  //       localStorage.removeItem("token");
  //       window.location.reload(false);
  //     }
  //   }
  // };

  // // get all tellers
  // const getTellers = async () => {
  //   let foundTellers = await users.filter((item) => {
  //     return item.role.includes("teller");
  //   });
  //   setTellers(foundTellers);
  // };

  // On submit

  const filter = async (e) => {
    e.preventDefault();
    console.log("filterParams", filterParams);
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/transactions/view-By-products?From=${filterParams.From}&To=${filterParams.To}&status=${filterParams.status}`,
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
        success(response.data.message);
        setInvoiceProducts(response.data.transactions);
      }
    } catch (err) {
      console.log(err);
      error("Couldn't fetch History");
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setFilterParams((filterParams) => ({
      ...filterParams,
      [e.target.name]: e.target.value,
    }));
  };

  // useEffect(() => {
  //   getDeptByPriv();
  //   getTellers();
  // }, []);

  return (
    <>
      <Wrapper>
        <h5>Panel</h5>
        <Content>
          {loading ? (
            <CircleSpinner />
          ) : (
            <>
              <form onSubmit={filter}>
                <div className="pair">
                  <label>From:</label>
                  <input
                    type="date"
                    name="From"
                    id="From"
                    onChange={onchangeHandler}
                    defaultValue={filterParams.From}
                  />
                </div>
                <div className="pair">
                  <label>To:</label>
                  <input
                    type="date"
                    name="To"
                    id="To"
                    onChange={onchangeHandler}
                    defaultValue={filterParams.To}
                  />
                </div>
                {/* <div className="pair">
                  <label>Department:</label>
                  <select
                    name="department"
                    id="department"
                    required
                    onChange={onchangeHandler}
                    defaultValue={filterParams.department}
                  >
                    <option value="">Select department</option>
                    {deptByPriv.map((item, i) => (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pair">
                  <label>Teller:</label>
                  <select
                    name="teller"
                    id="teller"
                    onChange={onchangeHandler}
                    defaultValue={filterParams.teller}
                  >
                    <option value="">Select teller</option>
                    {tellers.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.firstName} {item.lastName}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="pair">
                  <label>Status:</label>
                  <select
                    name="status"
                    id="status"
                    onChange={onchangeHandler}
                    defaultValue={filterParams.status}
                  >
                    <option>Select status</option>
                    <option value="paid">Paid</option>
                    <option value="not-paid">Not paid</option>
                  </select>
                </div>
                <button>Filter</button>
              </form>
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default Panel;
