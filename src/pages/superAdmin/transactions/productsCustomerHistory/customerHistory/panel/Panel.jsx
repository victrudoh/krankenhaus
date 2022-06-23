import React from "react";

// Styles
import { Wrapper, Content } from "./Panel.Styles";

const Panel = () => {
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
            <div className="pair">
              <label>Department:</label>
              <select name="department" id="department">
                <option>Select department</option>
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

export default Panel;
