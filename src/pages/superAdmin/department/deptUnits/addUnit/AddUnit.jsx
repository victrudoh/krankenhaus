import React from "react";

// styles
import { Wrapper, Content } from "./AddUnit.Styles";

const AddUnit = () => {
  return (
    <Wrapper>
      <h5>Add Unit</h5>
      <Content>
        <form>
          <div className="pair">
            <label>Department:</label>
            <select name="department" id="department">
              <option value="A&E">A&E</option>
              <option value="ENT">ENT</option>
              <option value="CSSD">CSSD</option>
              <option value="GAD">GAD</option>
            </select>
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
          <button>Add unit</button>
        </form>
      </Content>
    </Wrapper>
  );
};

export default AddUnit;
