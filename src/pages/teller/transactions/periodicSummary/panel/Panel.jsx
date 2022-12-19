import React, { useContext, useState } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";
import { success, error } from "../../../../../helpers/Alert";

const Panel = () => {
  const { leftPanelLoading, setLeftPanelLoading, setSavedInvoice } =
    useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
    hour1: "",
    hour2: "",
  });
  console.log("filterParams", filterParams);

  // On submit
  const filter = async (e) => {
    e.preventDefault();
    console.log("filterParams", filterParams);
    try {
      setLeftPanelLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.onrender.com/transactions/report?From=${filterParams.From}&To=${filterParams.To}&hour1=${filterParams.hour1}&hour2=${filterParams.hour2}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLeftPanelLoading(false);
      console.log("response", response);
      if (response.status === 200) {
        success(response.data.message);
        setSavedInvoice({
          display: true,
          data: response.data,
          items: [],
        });
      }
    } catch (err) {
      setLeftPanelLoading(false);
      console.log(err);
      error("Couldn't fetch History");
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
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
                    onChange={onchangeHandler}
                    defaultValue={filterParams.From}
                  />
                </div>
                <div className="pair">
                  <label>Hours:</label>
                  <input
                    type="time"
                    name="hour1"
                    id="hour1"
                    required
                    onChange={onchangeHandler}
                    defaultValue={filterParams.hour1}
                  />
                </div>
                <div className="pair">
                  <label>To:</label>
                  <input
                    type="date"
                    name="To"
                    id="To"
                    required
                    onChange={onchangeHandler}
                    defaultValue={filterParams.To}
                  />
                </div>
                <div className="pair">
                  <label>Hours:</label>
                  <input
                    type="time"
                    name="hour2"
                    id="hour2"
                    required
                    onChange={onchangeHandler}
                    defaultValue={filterParams.hour2}
                  />
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
