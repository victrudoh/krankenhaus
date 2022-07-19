import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

const Panel = () => {
  const { loading, setLoading, setPrinting, setEndOfDay } =
    useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    date: "",
    time: "",
  });
  console.log("Panel ~ filterParams", filterParams);

  const filter = async (e) => {
    setLoading(true);
    console.log("filterParams", filterParams);
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/transactions/summary?date=${filterParams.date}&time=${filterParams.time}`,
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
        let date = response.data.message.split("for ");
        setEndOfDay({
          day: date[1],
          transactions: response.data.transactions,
        });
        // setPrinting(true);
        // window.open("http://localhost:3000/print/endofday");
      }
    } catch (err) {
      error(err.response.data.message);
      setLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    let dateTime = e.target.value.split("T");
    setFilterParams({
      date: dateTime[0],
      time: dateTime[1],
    });
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
                    type="datetime-local"
                    name="date"
                    id="date"
                    onChange={onchangeHandler}
                    defaultValue={filterParams.date}
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
