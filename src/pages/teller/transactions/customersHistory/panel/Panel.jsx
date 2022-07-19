import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";
import { success, error } from "../../../../../helpers/Alert";

const Panel = () => {
  const { loading, setLoading, setInvoiceProducts } = useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
  });
  console.log("filterParams", filterParams);

  // On submit
  const filter = async (e) => {
    e.preventDefault();
    console.log("filterParams", filterParams);
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/transactions/view-By-products?From=${filterParams.From}&To=${filterParams.To}&s`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      console.log("response", response);
      if (response.status === 200) {
        success(response.data.message);
        setInvoiceProducts(response.data.transactions);
      }
    } catch (err) {
      console.log(err);
      error("Couldn't fetch History");
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
