import React from "react";
import { useNavigate } from "react-router-dom";

// Styles
import { Content, Wrapper } from "./Card.Styles";

const Card = ({ name, icon, value, url }) => {
  const navigate = useNavigate();

  const redirect = () => {
    console.log("Click:", url);
    navigate(`/superadmin/${url}`);
  };

  return (
    <>
      <Wrapper onClick={redirect}>
        <Content>
          <i className={icon}></i>
          <h5>No. of {name}</h5>
          <h3>{value}</h3>
        </Content>
      </Wrapper>
    </>
  );
};

export default Card;
