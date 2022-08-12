import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { success, error } from "../../../../../../helpers/Alert";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../../../components/circleSpinner/CircleSpinner.Styles";
import AppContext from "../../../../../../context/AppContext";

const Panel = () => {
  const { loading, setLoading } = useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
  });

  const filter = async (e) => {
    try {
      // e.preventDefault();
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/departments/summary`,
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
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  useEffect(() => {
    filter();
  }, []);

  return (
    <>
      <Wrapper>
        <h5>Panel</h5>
        <Content>
          <form>
            <div className="pair">
              <label>From:</label>
              <input type="date" name="startDate" id="startDate" />
            </div>
            <div className="pair">
              <label>To:</label>
              <input type="date" name="endDate" id="endDate" />
            </div>
            <button>Filter</button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default Panel;
