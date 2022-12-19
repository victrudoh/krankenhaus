import React, { useContext, useState } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";
const Panel = () => {
  const { leftPanelLoading, setLeftPanelLoading, setInvoiceCustomers } =
    useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
    firstName: "",
    lastName: "",
    status: "",
  });

  const filter = async (e) => {
    try {
      e.preventDefault();
      setLeftPanelLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.onrender.com/transactions/view-By-customer?From=${filterParams.From}&To=${filterParams.To}&status=${filterParams.status}&firstName=${filterParams.firstName}&lastName=${filterParams.lastName}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLeftPanelLoading(false);
      console.log("Invoice by customers response", response);
      if (response.status === 200) {
        success(response.data.message);
        setInvoiceCustomers(response.data.transactions);
      }
    } catch (err) {
      error("OOps! Couldn't fetch record");
      console.log(err);
    }
  };

  const onChangeHandler = (e) => {
    e.persist();
    setFilterParams(() => ({
      ...filterParams,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        <h5>Panel</h5>
        <Content>
          {leftPanelLoading ? (
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
                    required
                    defaultValue={filterParams.From}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="pair">
                  <label>To:</label>
                  <input
                    type="date"
                    name="To"
                    id="To"
                    required
                    defaultValue={filterParams.To}
                    onChange={onChangeHandler}
                  />
                </div>
                {/* <div className="pair">
                  <label>First name:</label>
                  <input type="text" name="firstName" id="firstName" />
                </div>
                <div className="pair">
                  <label>Last name:</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    defaultValue={filterParams.lastName}
                    onChange={onChangeHandler}
                  />
                </div> */}
                <div className="pair">
                  <label>Status:</label>
                  <select
                    name="status"
                    id="status"
                    defaultValue={filterParams.status}
                    onChange={onChangeHandler}
                  >
                    <option>Select status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Not paid</option>
                  </select>
                </div>
                <button type="submit">Filter</button>
              </form>
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default Panel;
