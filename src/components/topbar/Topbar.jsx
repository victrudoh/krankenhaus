import React from "react";

//Dependencies
import { NavLink, Link } from "react-router-dom";

//Styles
import {
  Wrapper,
  TopbarLeft,
  TopbarRight,
  User,
  UserName,
  Status,
} from "./Topbar.Styles";

const notifications = "Scribble scribble";

const curr_user = {
  display_name: "victrudoh@gmail.com",
  status: "Available",
};

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const Topbar = ({ title, setTitle }) => {
  // const ifUser = () => <button className="mx-3">User Logs</button>;
  // let test = ifUser();

  return (
    <Wrapper>
      <TopbarLeft>
        {title}
        {/* || {test} */}
        {/* <span
          className="bx bx-menu"
          id="topbar-btn"
          onClick={toggleMiniMenu}
        ></span>
        <div className="break">
          Balance: £18.17 | Minutes : 10 h 48 m 51 s
          <NavLink to="/" className="Addmoney">
            Add Money
          </NavLink>
        </div> */}
      </TopbarLeft>
      <TopbarRight>
        <User>
          <UserName>{curr_user.display_name}</UserName>
          <Status className="text-danger">{curr_user.status}</Status>
        </User>
      </TopbarRight>
    </Wrapper>
  );
};

export default Topbar;
