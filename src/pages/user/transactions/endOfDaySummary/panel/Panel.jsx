import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

const Panel = () => {
  const { loading, setLoading, setSavedInvoice } = useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    date: "",
    time: "",
    time2: "",
  });

  const filter = async (e) => {
    setLoading(true);
    console.log("filterParams", filterParams);
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://hospital-ms-api.onrender.com/transactions/summary?date=${filterParams.date}&time=${filterParams.time}&time2=${filterParams.time2}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("End of day response", response);
      setLoading(false);
      if (response.status === 200) {
        success(response.data.message);
        setSavedInvoice({
          display: true,
          data: response.data,
          items: [],
        });
        // let date = response.data.message.split("for ");
        // setEndOfDay({
        //   day: date[1],
        //   transactions: response.data.transactions,
        // });
      }
    } catch (err) {
      error(err.response.data.message);
      setLoading(false);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const onchangeHandler = (e) => {
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
          {loading ? (
            <CircleSpinner />
          ) : (
            <>
              <form onSubmit={filter}>
                <div className="pair">
                  <label>Date under review:</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    onChange={onchangeHandler}
                    defaultValue={filterParams.date}
                  />
                </div>
                <div className="pair">
                  <label>Start Time:</label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    required
                    onChange={onchangeHandler}
                    defaultValue={filterParams.time}
                  />
                </div>
                <div className="pair">
                  <label>End Time:</label>
                  <input
                    type="time"
                    name="time2"
                    id="time2"
                    required
                    onChange={onchangeHandler}
                    defaultValue={filterParams.time2}
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
