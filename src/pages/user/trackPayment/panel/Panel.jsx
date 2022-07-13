import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const Panel = () => {
  const { loading, setLoading } = useContext(AppContext);

  const [findTrx, setFindTrx] = useState({
    transactionId: "",
  });

  const trackPayment = async (e) => {
    console.log("findTrx", findTrx);
    e.preventDefault();
    try {
      // setLoading(true);
      const response = await axios.post(
        "https://hospital-ms-api.herokuapp.com/users/create",
        findTrx,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      // console.log("response", response);
      // if (response.status === 200) {
      //   success("Added new item");
      // }
    } catch (err) {
      error("Couldn't track payment");
      console.log(err);
      setLoading(false);
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
          {loading ? (
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
