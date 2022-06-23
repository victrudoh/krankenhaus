import React from "react";

// styles
import { Content, Wrapper } from "./Overview.Styles";

// components
import Card from "./card/Card";

const Overview = () => {
  return (
    <>
      <Wrapper>
        <h6>Overview</h6>
        <Content>
          <Card name="users" icon="bx bxs-group" value="210" url="users" />
          <Card
            name="departments"
            icon="bx bxs-building"
            value="25"
            url="department"
          />
          <Card name="products" icon="bx bx-box" value="610" url="products" />
          <Card
            name="transactions"
            icon="bx bxs-wallet-alt"
            value="40"
            url="transactions"
          />
        </Content>
      </Wrapper>
    </>
  );
};

export default Overview;
