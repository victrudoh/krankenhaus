import React from "react";

// Styles
import { Wrapper } from "./Error404.Styles";

const Error404 = ({ title, setTitle }) => {
  setTitle("Page not found");

  return (
    <>
      <Wrapper>404: Page not found</Wrapper>
    </>
  );
};

export default Error404;
