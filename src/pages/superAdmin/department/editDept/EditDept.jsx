import React from "react";

// Styles
import { Wrapper, Content } from "./EditDept.Styles";

const EditDept = ({ setIsEditing }) => {
  return (
    <>
      <Wrapper>
        <h5>Edit department</h5>
        <Content>
          <form>
            <div className="pair">
              <label>Department:</label>
              <input
                type="text"
                name="department"
                id="department"
                placeholder="Department"
              />
            </div>
            <div className="pair">
              <label>Publish:</label>
              <select name="publish" id="publish">
                <option>Publish</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <button type="submit">Update department</button>
            <button className="mx-3" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default EditDept;
