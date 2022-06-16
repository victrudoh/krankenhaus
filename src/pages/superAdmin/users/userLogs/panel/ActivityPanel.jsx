import React from "react";

// Styles
import { Wrapper, Content } from "./ActivityPanel.Styles";

const ActivityPanel = () => {
  return (
    <>
      <Wrapper>
        <h5>Log panel</h5>
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
              <label>Activity:</label>
              <select name="activity" id="activity">
                <option>Select activity</option>
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
              <label>Users:</label>
              <select name="users" id="users">
                <option>Select user</option>
                <option value="all_activities">Mark Joseph</option>
                <option value="login">Roxxy Smith</option>
                <option value="reprint">Daniel Regha</option>
              </select>
            </div>
            <button>Filter</button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default ActivityPanel;
