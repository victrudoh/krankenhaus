// Dependencies
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { info } from "../../helpers/Alert";

// Styles
import "./sidebar.css";
import AppContext from "../../context/AppContext";

const Sidebar = () => {
  const { user, setTopbarName } = useContext(AppContext);
  // const [superAdmin, setSuperAdmin] = useState(false);
  // const [revenue, setRevenue] = useState(false);

  // if (user.role === "super-admin") {
  //   setSuperAdmin(true);
  // }

  // if (user.department === "Revenue") {
  //   setRevenue(true);
  // }

  const logoutHandler = () => {
    info("You were logged out");
    localStorage.removeItem("token");
    window.location.reload(false);
  };

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

            {/* SUPER ADMIN */}
            {user.access === "full" ? (
              <>
                {/* Pharmacy Admin */}
                {user.role === "pharmacy-admin" ? (
                  <>
                    <CDBSidebarContent className="sidebar-content">
                      <CDBSidebarMenu>
                        <NavLink
                          to="/"
                          onClick={() => setTopbarName("Dashboard")}
                        >
                          <CDBSidebarMenuItem icon="table" className="onHover">
                            Dashboard
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/pharmacyadmin/products"
                          onClick={() => setTopbarName("Pharmacy Products")}
                        >
                          <CDBSidebarMenuItem icon="box" className="onHover">
                            Products
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/pharmacyadmin/stores"
                          onClick={() => setTopbarName("Pharmacy Stores")}
                        >
                          <CDBSidebarMenuItem
                            icon="building"
                            className="onHover"
                          >
                            Stores
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/pharmacyadmin/suppliers"
                          onClick={() => setTopbarName("Pharmacy Suppliers")}
                        >
                          <CDBSidebarMenuItem
                            icon="box"
                            /*cross*/ className="onHover"
                          >
                            Suppliers
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/pharmacyadmin/measuring_units"
                          onClick={() => setTopbarName("Measuring Units")}
                        >
                          <CDBSidebarMenuItem icon="box" className="onHover">
                            Measuring Units
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/pharmacyadmin/config"
                          onClick={() => setTopbarName("Configurations")}
                        >
                          <CDBSidebarMenuItem icon="flag" className="onHover">
                            Config
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                    </CDBSidebarContent>
                  </>
                ) : (
                  <>
                    {/* Super Admin */}
                    <CDBSidebarContent className="sidebar-content">
                      <CDBSidebarMenu>
                        <NavLink
                          to="/"
                          onClick={() => setTopbarName("Dashboard")}
                        >
                          <CDBSidebarMenuItem icon="table" className="onHover">
                            Dashboard
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/superadmin/users"
                          onClick={() => setTopbarName("Users")}
                        >
                          <CDBSidebarMenuItem icon="users" className="onHover">
                            Users
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/superadmin/department"
                          onClick={() => setTopbarName("Departments")}
                        >
                          <CDBSidebarMenuItem
                            icon="building"
                            className="onHover"
                          >
                            Departments
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/superadmin/products"
                          onClick={() => setTopbarName("Products")}
                        >
                          <CDBSidebarMenuItem
                            icon="box"
                            /*cross*/ className="onHover"
                          >
                            Products/Services
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/superadmin/transactions"
                          onClick={() => setTopbarName("Transactions")}
                        >
                          <CDBSidebarMenuItem icon="wallet" className="onHover">
                            Transactions
                          </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                          to="/superadmin/config"
                          onClick={() => setTopbarName("Configurations")}
                        >
                          <CDBSidebarMenuItem icon="flag" className="onHover">
                            Config
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                    </CDBSidebarContent>
                  </>
                )}
              </>
            ) : (
              ""
            )}

            {/* PHARMACY ADMIN */}
            {user.access === "full" && user.role === "pharmacy-admin" ? "" : ""}

            {/* USER */}
            {user.access === "limited" ? (
              <>
                {/* TELLER */}
                {user.role === "teller" ? (
                  <>
                    <CDBSidebarContent className="sidebar-content">
                      <CDBSidebarMenu>
                        <NavLink
                          to="/teller/payment"
                          onClick={() => setTopbarName("Make Payment")}
                        >
                          <CDBSidebarMenuItem icon="pen" className="onHover">
                            Make Payment
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                      <CDBSidebarMenu>
                        <NavLink
                          to="/teller/transactions"
                          onClick={() => setTopbarName("Transactions")}
                        >
                          <CDBSidebarMenuItem icon="wallet" className="onHover">
                            Transaction History
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                      <CDBSidebarMenu>
                        <NavLink
                          to="/teller/config"
                          onClick={() => setTopbarName("Configurations")}
                        >
                          <CDBSidebarMenuItem icon="flag" className="onHover">
                            Config
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                    </CDBSidebarContent>
                  </>
                ) : (
                  ""
                )}

                {/* PHARMACY USER */}
                {user.department === "Pharmacy" && user.role === "user" ? (
                  <>
                    <CDBSidebarContent className="sidebar-content">
                      <CDBSidebarMenu>
                        <NavLink
                          to="/pharm-unit/products"
                          onClick={() => setTopbarName("All Products")}
                        >
                          <CDBSidebarMenuItem icon="pen" className="onHover">
                            All Products
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                      <CDBSidebarMenu>
                        <NavLink
                          to="/pharm-unit/pending"
                          onClick={() => setTopbarName("Pending Products")}
                        >
                          <CDBSidebarMenuItem icon="wallet" className="onHover">
                            Pending Products
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                      <CDBSidebarMenu>
                        <NavLink
                          to="/pharm-unit/invoice"
                          onClick={() => setTopbarName("Create Invoice")}
                        >
                          <CDBSidebarMenuItem icon="flag" className="onHover">
                            Create invoice
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                      <CDBSidebarMenu>
                        <NavLink
                          to="/pharm-unit/payment"
                          onClick={() => setTopbarName("Track Payment")}
                        >
                          <CDBSidebarMenuItem icon="flag" className="onHover">
                            Track Payment
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                    </CDBSidebarContent>
                  </>
                ) : (
                  ""
                )}

                {/* OTHER USERS */}
                {user.role !== "teller" && user.department !== "Pharmacy" ? (
                  <>
                    <CDBSidebarContent className="sidebar-content">
                      <CDBSidebarMenu>
                        <NavLink
                          to="/user/invoice"
                          onClick={() => setTopbarName("Create Invoice")}
                        >
                          <CDBSidebarMenuItem icon="pen" className="onHover">
                            Create Invoice
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                      <CDBSidebarMenu>
                        <NavLink
                          to="/user/payment"
                          onClick={() => setTopbarName("Track Payment")}
                        >
                          <CDBSidebarMenuItem icon="wallet" className="onHover">
                            Track Payment
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                      <CDBSidebarMenu>
                        <NavLink
                          to="/user/transactions"
                          onClick={() => setTopbarName("Transactions")}
                        >
                          <CDBSidebarMenuItem icon="list" className="onHover">
                            Transaction History
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                      <CDBSidebarMenu>
                        <NavLink
                          to="/user/config"
                          onClick={() => setTopbarName("Configuration")}
                        >
                          <CDBSidebarMenuItem icon="flag" className="onHover">
                            Config
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenu>
                    </CDBSidebarContent>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            {/* Just added this extra block of code so there'll be gap in the sidebar */}
            <CDBSidebarContent>
              <CDBSidebarMenu></CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarContent>
              <CDBSidebarMenu></CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarContent>
              <CDBSidebarMenu>
                <NavLink to="/login" onClick={logoutHandler}>
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
