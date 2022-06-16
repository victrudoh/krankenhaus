import React from "react";

// Styles
import { Wrapper, Content } from "./AddDept.Styles";

const AddDept = () => {
  return (
    <>
      <Wrapper>
        <h5>Add department</h5>
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
            <button>Add department</button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default AddDept;
