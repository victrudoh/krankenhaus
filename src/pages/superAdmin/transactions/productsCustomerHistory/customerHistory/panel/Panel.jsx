import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../../helpers/Alert";
import { CircleSpinner } from "../../../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

const Panel = () => {
  const { loading, setLoading, setTransactions } = useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
    status: "",
    lastName: "",
    firstName: "",
  });

  const filter = async (e) => {
    setLoading(true);
    console.log("filterParams", filterParams);
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/transactions/view-By-customer?From=${filterParams.From}&To=${filterParams.To}&status=${filterParams.status}&lastName=${filterParams.lastName}&firstName=${filterParams.firstName}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", response);
      setLoading(false);
      if (response.status === 200) {
        success(response.data.message);
        setTransactions(response.data.transactions);
      }
    } catch (err) {
      error(err.response.data.message);
      setLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setFilterParams((filterParams) => ({
      ...filterParams,
      [e.target.name]: e.target.value,
    }));
  };

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
                <div className="pair">
                  <label>firstName:</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Customer's first name"
                    onChange={onchangeHandler}
                    defaultValue={filterParams.firstName}
                  />
                </div>
                <div className="pair">
                  <label>lastName:</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Customer's last name"
                    onChange={onchangeHandler}
                    defaultValue={filterParams.lastName}
                  />
                </div>
                <div className="pair">
                  <label>Status:</label>
                  <select name="status" id="status">
                    <option>Select status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Not paid</option>
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
