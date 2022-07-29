import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../../helpers/Alert";

//Styles
import { Wrapper, Content } from "./ProductHistoryPanel.Styles";

const ProductHistoryPanel = () => {
  const { loading, setLoading, users, departments, setTransactions } =
    useContext(AppContext);
  console.log(
    "🚀 ~ file: ProductHistoryPanel.jsx ~ line 12 ~ ProductHistoryPanel ~ users",
    users
  );

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
    department: "",
    teller: "",
    status: "",
  });

  const [tellers, setTellers] = useState([]);
  console.log(
    "🚀 ~ file: ProductHistoryPanel.jsx ~ line 27 ~ ProductHistoryPanel ~ tellers",
    tellers
  );

  const fetchTellers = async () => {
    try {
      const foundTellers = await users.filter((item) =>
        item.department.includes("Bank")
      );
      setTellers(foundTellers);
    } catch (err) {
      error("Couldn't fetch tellers");
      console.log(err);
    }
  };

  const filter = (e) => {};

  const onchangeHandler = (e) => {
    e.persist();
    setFilterParams((filterParams) => ({
      ...filterParams,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchTellers();
  }, []);

  return (
    <>
      <Wrapper>
        <h5>Panel</h5>
        <Content>
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
            <div className="pair">
              <label>Department:</label>
              <select
                name="department"
                id="department"
                required
                onChange={onchangeHandler}
                defaultValue={filterParams.department}
              >
                <option value="">Select department</option>
                {departments.map((item, i) => (
                  <option key={i} value={item.department.name}>
                    {item.department.name}
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
                <option>Select teller</option>
                {tellers.map((item, i) => (
                  <option value={item.id}>
                    {item.firstName} {item.lastName}
                  </option>
                ))}
              </select>
            </div>
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
                <option value="unpaid">Not paid</option>
              </select>
            </div>
            <button>Filter</button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default ProductHistoryPanel;
