import React from "react";

// Styles
import { Wrapper } from "./Config.Styles";

// component
import Contact from "./contact/Contact";
import ChangePassword from "./changePassword/ChangePassword";

const Config = ({ setTitle }) => {
  setTitle("Configuration");
  return (
    <>
      <Wrapper>
        <Contact />
        <ChangePassword />
      </Wrapper>
    </>
  );
};

export default Config;
