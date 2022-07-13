import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../../../../../context/AppContext";

//Styles
import { Wrapper, Content } from "./ProductHistoryPanel.Styles";

const ProductHistoryPanel = () => {
  const { loading, setLoading, departments, setTransactions } =
    useContext(AppContext);

  const [filterParams, setFilterParams] = useState({
    From: "",
    To: "",
    department: "",
    status: "",
    firstName: "",
    lastName: "",
  });

  const filter = (e) => {};

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
            <div className="pair">
              <label>Department:</label>
              <select
                name="department"
                id="department"
                required
                onChange={onchangeHandler}
                defaultValue={filterParams.department}
              >
                <option value="">Select department</option>
                {departments.map((item, i) => (
                  <option key={i} value={item.department.name}>
                    {item.department.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pair">
              <label>Teller:</label>
              <select name="teller" id="teller">
                <option>Select teller</option>
                <option value="all_activities">All activities</option>
                <option value="login">Login</option>
                <option value="reprint">Reprint</option>
                <option value="create_user">Create user</option>
                <option value="admin_edit_user">Admin edit user</option>
                <option value="edit_product">Edit product</option>
                <option value="add_product">Add product</option>
              </select>
            </div>
            <div className="pair">
              <label>Status:</label>
              <select name="status" id="status">
                <option>Select status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Not paid</option>
              </select>
            </div>
            <button>Filter</button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default ProductHistoryPanel;
