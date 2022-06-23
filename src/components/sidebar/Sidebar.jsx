// Dependencies
import React from "react";
import { NavLink } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

// Styles
import "./sidebar.css";

const Sidebar = () => {
  return (
    <>
      <aside className="pinToTop">
        <div
          style={{
            display: "flex",
            height: "100vh",
            overflow: "scroll initial",
          }}
        >
          <CDBSidebar textColor="#000080" backgroundColor="white">
            <CDBSidebarHeader
              prefix={<i className="fa fa-bars fa-large hideButton"></i>}
            >
              <a
                href="/"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                Krankenhaus <i className="bx bx-plus-medical"></i>
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to="/" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table" className="onHover">
                    Dashboard
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  to="/superadmin/users"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="users" className="onHover">
                    Users
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  to="/superadmin/department"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="building" className="onHover">
                    Departments
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  to="/superadmin/products"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="box" /*cross*/ className="onHover">
                    Products/Services
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  to="/superadmin/transactions"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="wallet" className="onHover">
                    Transactions
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  to="/superadmin/config"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="flag" className="onHover">
                    Config
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            {/* Just added this extra block of code so there'll be gap in the sidebar */}
            <CDBSidebarContent>
              <CDBSidebarMenu></CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarContent>
              <CDBSidebarMenu>
                {/* <NavLink
                  exact
                  to="/superadmin/changepassword"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="user" className="onHover">
                    Change Password
                  </CDBSidebarMenuItem>
                </NavLink> */}
                <NavLink
                  exact
                  to="/superadmin/logout"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="user" className="onHover">
                    Log out
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: "center" }}>
              <div
                style={{
                  padding: "20px 5px",
                }}
              >
                &copy; Krankenhaus 2022
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
