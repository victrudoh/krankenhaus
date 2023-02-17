import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { success, error } from "../../../../../../helpers/Alert";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../../../components/circleSpinner/CircleSpinner.Styles";
import AppContext from "../../../../../../context/AppContext";

const Panel = () => {
  const { loading, setLoading, setDeptSummary } = useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
  });

  const filter = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/departments/summary?From=${filterParams.From}&To=${filterParams.To}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      console.log(
        "🚀 ~ file: Panel.jsx ~ line 27 ~ filter ~ response",
        response
      );
      if (response.status === 200) {
        success(response.messgae);
        setDeptSummary(response.data.summary);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const onchangeHandler = async (e) => {
    e.persist();
    setFilterParams({
      ...filterParams,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   filter();
  // }, []);

  return (
    <>
      <Wrapper>
        <h5>Panel</h5>
        {loading ? (
          <CircleSpinner />
        ) : (
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
              <button type="submit">Filter</button>
            </form>
          </Content>
        )}
      </Wrapper>
    </>
  );
};

export default Panel;
