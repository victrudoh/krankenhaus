import React from "react";

// Styles
import { Wrapper, Content } from "./ChangePassword.Styles";

const ChangePassword = () => {
  return (
    <>
      <Wrapper>
        <h5>Change password</h5>
        <Content>
          <form>
            <div className="pair">
              <label>Current Password:</label>
              <input
                type="password"
                name="current_password"
                id="current_password"
                placeholder="Current Password"
              />
            </div>
            <div className="pair">
              <label>New Password:</label>
              <input
                type="password"
                name="new_password"
                id="new_password"
                placeholder="New Password"
              />
            </div>
            <div className="pair">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
              />
            </div>
            <button>Submit</button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default ChangePassword;
