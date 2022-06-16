import React from "react";

// styles
import { Wrapper, Content } from "./AddPrivilege.Styles";

const AddPrivilege = () => {
  return (
    <Wrapper>
      <h5>Add a new privilege</h5>
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
          <button>Add privilege</button>
        </form>
      </Content>
    </Wrapper>
  );
};

export default AddPrivilege;
