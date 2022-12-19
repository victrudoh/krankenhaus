import React, { useContext, useState } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";
import { success, error } from "../../../../../helpers/Alert";

const Panel = () => {
  const { leftPanelLoading, setLeftPanelLoading, setInvoiceProducts } =
    useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
    status: "",
  });
  console.log("filterParams", filterParams);

  const filter = async (e) => {
    e.preventDefault();
    console.log("filterParams", filterParams);
    try {
      setLeftPanelLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.onrender.com/transactions/view-By-products?From=${filterParams.From}&To=${filterParams.To}&status=${filterParams.status}`,
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

  // useEffect(() => {
  //   getDeptByPriv();
  //   getTellers();
  // }, []);

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
                  <label>Status:</label>
                  <select
                    name="status"
                    id="status"
                    onChange={onchangeHandler}
                    defaultValue={filterParams.status}
                  >
                    <option>Select status</option>
                    <option value="paid">Paid</option>
                    <option value="not-paid">Not paid</option>
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
