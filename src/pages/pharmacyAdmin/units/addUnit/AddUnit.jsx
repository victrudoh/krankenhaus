import React, { useContext, useState } from "react";
import axios from "axios";
import AppContext from "../../../../context/AppContext";
import { success, error } from "../../../../helpers/Alert";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// styles
import { Wrapper, Content } from "./AddUnit.Styles";

const AddUnit = () => {
  const {
    loading,
    setLoading,
    getDepartments,
    deptForInventory,
    getPharmacyUnits,
  } = useContext(AppContext);

  //   get Pharmacy Id
  const pharmacy = deptForInventory.map((item) => {
    if (item.name === "Pharmacy") {
      return item;
    }
  });

  const [newUnit, setNewUnit] = useState({
    department: "Pharmacy",
    name: "",
    // account: "none",
    publish: "",
  });

  const addunit = async (e) => {
    e.preventDefault();
    console.log("newUnit", newUnit);
    try {
      setLoading(true);
      const response = await axios.post(
        `https://hospital-ms-api.herokuapp.com/departments/unit/new?departmentId=${pharmacy[0].id}`,
        newUnit,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(
        "🚀 ~ file: AddUnit.jsx ~ line 34 ~ addunit ~ response",
        response
      );
      setLoading(false);
      if (response.status === 200) {
        success("Created new department successfully");
        getDepartments();
        getPharmacyUnits();
        // setAddedDept(response.status);
      }
    } catch (err) {
      error("Psych! Couldn't add unit");
      console.log(err);
      setLoading(false);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewUnit(() => ({
      ...newUnit,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        <h5>Add Unit</h5>
        <Content>
          {loading ? (
            <>
              <CircleSpinner />
            </>
          ) : (
            <>
              <form onSubmit={addunit}>
                <div className="pair">
                  <label>Unit:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Unit"
                    onChange={onchangeHandler}
                    defaultValue={newUnit.name}
                  />
                </div>
                {/* <div className="pair">
                  <label>Account:</label>
                  <input
                    type="text"
                    name="account"
                    id="account"
                    placeholder="Account Details"
                    onChange={onchangeHandler}
                    defaultValue={newUnit.account}
                  />
                </div> */}
                <div className="pair">
                  <label>Publish:</label>
                  <select
                    name="publish"
                    id="publish"
                    onChange={onchangeHandler}
                    defaultValue={newUnit.publish}
                  >
                    <option>Publish</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
                <button>Add unit</button>
              </form>
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default AddUnit;
