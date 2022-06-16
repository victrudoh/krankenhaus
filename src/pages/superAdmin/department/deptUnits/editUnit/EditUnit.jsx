import React from "react";

// Styles
import { Wrapper, Content } from "./EditUnit.Styles";

const EditUnit = ({ setIsEditing }) => {
  return (
    <Wrapper>
      <h5>Edit Unit</h5>
      <Content>
        <form>
          <div className="pair">
            <label>Department:</label>
            <h4>A&E</h4>
          </div>
          <div className="pair">
            <label>Unit:</label>
            <input type="text" name="unit" id="unit" placeholder="Unit" />
          </div>
          <div className="pair">
            <label>Publish:</label>
            <select name="publish" id="publish">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <button type="submit">Update unit</button>
          <button className="mx-3" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      </Content>
    </Wrapper>
  );
};

export default EditUnit;
