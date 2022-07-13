import React from "react";

// Styles
import { Wrapper } from "./Config.Styles";

// component
import ChangePassword from "./changePassword/ChangePassword";

const Config = () => {
  return (
    <>
      <Wrapper>
        <ChangePassword />
      </Wrapper>
    </>
  );
};

export default Config;
