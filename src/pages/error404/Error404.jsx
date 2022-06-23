import React from "react";

// Styles
import { Wrapper, Content } from "./Error404.Styles";

const Error404 = ({ title, setTitle }) => {
  setTitle("Page not found");

  return (
    <>
      <Wrapper>
        <Content>
          <h2>404: Page not found</h2>
        </Content>
      </Wrapper>
    </>
  );
};

export default Error404;
