import React, { useState, useContext } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const Panel = () => {
  const { leftPanelLoading, setLeftPanelLoading, setTrackPayment } =
    useContext(AppContext);

  const [findTrx, setFindTrx] = useState({
    transactionId: "",
  });

  const trackPayment = async (e) => {
    console.log("findTrx", findTrx);
    e.preventDefault();
    try {
      setLeftPanelLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/transactions/${findTrx.transactionId}`,
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
        success("Found payment");
        setTrackPayment({
          transaction: response.data.transaction,
          products: response.data.products,
        });
      }
    } catch (err) {
      error("Couldn't track payment");
      console.log(err);
      setLeftPanelLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setFindTrx((findTrx) => ({
      ...findTrx,
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
            <form onSubmit={trackPayment}>
              <div className="pair">
                <label>Transaction ID:</label>
                <input
                  type="text"
                  name="transactionId"
                  id="transactionId"
                  required
                  placeholder="Transaction ID"
                  onChange={onchangeHandler}
                  defaultValue={findTrx.transactionId}
                />
              </div>
              <button type="submit">Find Transaction</button>
            </form>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default Panel;
