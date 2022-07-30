import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

const Panel = () => {
  const { loading, setLoading, setEndOfDay } = useContext(AppContext);

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
        `https://hospital-ms-api.herokuapp.com/transactions/summary?date=${filterParams.date}&time=${filterParams.time}&time2=${filterParams.time2}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("response", response);
      setLoading(false);
      if (response.status === 200) {
        success(response.data.message);
        let date = response.data.message.split("for ");
        setEndOfDay({
          day: date[1],
          transactions: response.data.transactions,
        });
      }
    } catch (err) {
      error(err.response.data.message);
      setLoading(false);
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
