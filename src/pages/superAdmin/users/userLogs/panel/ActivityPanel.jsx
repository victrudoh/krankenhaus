import React, { useContext, useState } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Content } from "./ActivityPanel.Styles";

const ActivityPanel = () => {
  const { leftPanelLoading, setLeftPanelLoading, setUserLogs } =
    useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
    page: 0,
    size: 5,
  });

  const filter = async (e) => {
    try {
      e.preventDefault();
      setLeftPanelLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/auth/logs/all?From=${filterParams.From}&To=${filterParams.To}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: ActivityPanel.jsx ~ line 34 ~ filter ~ response",
      //   response
      // );
      setLeftPanelLoading(false);
      if (response.status === 200) {
        success(response.data.message);
        setUserLogs(response.data.logs);
      }
    } catch (err) {
      error("Couldn't fetch logs");
      console.log(err);
      setLeftPanelLoading(false);
      // if (err.response.status === 401) {
      //   error("Unauthorized");
      //   localStorage.removeItem("token");
      //   window.location.reload(false);
      // }
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
        <h5>Log panel</h5>
        {leftPanelLoading ? (
          <CircleSpinner />
        ) : (
          <>
            <Content>
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
                <button>Filter</button>
              </form>
            </Content>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ActivityPanel;
