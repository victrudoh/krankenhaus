import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

//styles
import { Wrapper, Content } from "./Edit.Styles";

const Edit = () => {
  const {
    loading,
    setLoading,
    editMeasuringUnit,
    setEditMeasuringUnit,
    getInventoryMeasuringUnit,
  } = useContext(AppContext);

  const [updateMeasuringUnit, setUpdateMeasuringUnit] = useState({
    name: "",
  });

  const submit = async (e) => {
    // console.log("updateMeasuringUnit", updateMeasuringUnit);
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.herokuapp.com/inventory/measuring-unit/edit?id=${editMeasuringUnit.unit.id}`,
        updateMeasuringUnit,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        success("Updated measuring unit successfully");
        setEditMeasuringUnit({
          unit: "",
          editing: false,
        });
        getInventoryMeasuringUnit();
      }
    } catch (err) {
      error("  can't update supplier");
      console.log(err);
      setLoading(false);
    }
  };

  // onclick "cancel"
  const quitEditHandler = () => {
    setEditMeasuringUnit({
      unit: "",
      editing: false,
    });
  };

  const onchangeHandler = (e) => {
    e.persist();
    setUpdateMeasuringUnit((updateMeasuringUnit) => ({
      ...updateMeasuringUnit,
      [e.target.name]: e.target.value,
    }));
  };

  // populate fields
  useEffect(() => {
    setUpdateMeasuringUnit(() => ({
      ...editMeasuringUnit.unit,
    }));
  }, []);

  return (
    <>
      <Wrapper>
        <h5>Edit Unit</h5>
        <Content>
          <form onSubmit={submit}>
            <div className="pair">
              <label>Measuring unit name:</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Measuring unit name"
                onChange={onchangeHandler}
                defaultValue={editMeasuringUnit.unit.name}
              />
            </div>
            {loading ? (
              <CircleSpinner />
            ) : (
              <>
                <button type="submit">Update Measuring unit</button>
                <button className="mx-3" onClick={quitEditHandler}>
                  Cancel
                </button>
              </>
            )}
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default Edit;
