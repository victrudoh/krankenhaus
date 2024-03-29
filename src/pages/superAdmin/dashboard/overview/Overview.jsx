import { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// styles
import { Content, Wrapper } from "./Overview.Styles";

// components
import Card from "./card/Card";

const Overview = () => {
  const { users, departments, products, trxLength } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        <h6>Overview</h6>
        <Content>
          <Card
            name="users"
            icon="bx bxs-group"
            value={users.length}
            url="users"
          />
          <Card
            name="departments"
            icon="bx bxs-building"
            value={departments.length}
            url="department"
          />
          <Card
            name="products"
            icon="bx bx-box"
            value={products.length}
            url="products"
          />
          <Card
            name="transactions"
            icon="bx bxs-wallet-alt"
            value={trxLength}
            url="transactions"
          />
        </Content>
      </Wrapper>
    </>
  );
};

export default Overview;
