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
            <button>Filter</button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default Panel;
