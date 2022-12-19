import React, { useState, useContext } from "react";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const Panel = () => {
  const { loading, setLoading, getInventoryMeasuringUnit } =
    useContext(AppContext);

  const [newMeasuringUnit, setNewMeasuringUnit] = useState({
    name: "",
  });

  const addMeasuringUnit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hospital-ms-api.onrender.com/inventory/measuring-unit/add",
        newMeasuringUnit,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success("Created new Measuring unit successfully");
        getInventoryMeasuringUnit();
      }
    } catch (err) {
      error("Couldn't add measuring unit");
      console.log(err);
      setLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewMeasuringUnit((newMeasuringUnit) => ({
      ...newMeasuringUnit,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        <h5>Add Measuring Unit</h5>
        <Content>
          {loading ? (
            <CircleSpinner />
          ) : (
            <form onSubmit={addMeasuringUnit}>
              {/* name */}
              <div className="pair">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Measuring Unit Name"
                  onChange={onchangeHandler}
                  defaultValue={newMeasuringUnit.name}
                />
              </div>
              <button type="submit">Add Measuring Unit</button>
            </form>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default Panel;
