import React from "react";

// Styles
import { Wrapper } from "./UnAuth.Styles";

const UnAuth = ({ title, setTitle }) => {
  setTitle("Unauthorized");

  return (
    <>
      <Wrapper>UnAuthorized</Wrapper>
    </>
  );
};

export default UnAuth;
