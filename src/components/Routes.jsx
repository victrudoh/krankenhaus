// Dependencies
import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Layed from "./Layed";
import UnAuth from "../pages/unAuth/UnAuth";
import Error404 from "../pages/error404/Error404";

// Login
// import Login from "../pages/login/Login";

// Super Admin
import Dashboard from "../pages/superAdmin/dashboard/Dashboard";
import Users from "../pages/superAdmin/users/Users";
import UserLogs from "../pages/superAdmin/users/userLogs/UserLogs";
import Department from "../pages/superAdmin/department/Department";
import DeptUnits from "../pages/superAdmin/department/deptUnits/DeptUnits";
import DeptPrivilege from "../pages/superAdmin/department/deptPrivilege/DeptPrivilege";
import ViewUnit from "../pages/superAdmin/department/deptUnits/viewUnit/ViewUnit";
import Config from "../pages/superAdmin/config/Config";
import Products from "../pages/superAdmin/products/Products";
import Transactions from "../pages/superAdmin/transactions/Transactions";
import ViewDetails from "../pages/superAdmin/transactions/productsCustomerHistory/customerHistory/viewDetails/ViewDetails";

const MainRouter = () => {
  // const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* {!token ? (
        <Route path="/" element={<Layed />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>
      ) : ( */}
      <Route path="/" element={<Layed />}>
        <Route index element={<Dashboard />} />

        <Route path="/superadmin/dashboard" element={<Dashboard />} />

        {/* USERS */}
        <Route path="/superadmin/users" element={<Users />} />
        <Route path="/superadmin/userlogs" element={<UserLogs />} />

        {/* DEPARTMENT */}
        <Route path="/superadmin/department" element={<Department />} />
        <Route path="/superadmin/deptunits" element={<DeptUnits />} />
        <Route path="/superadmin/deptprivilege" element={<DeptPrivilege />} />
        <Route path="/superadmin/viewunit" element={<ViewUnit />} />

        {/* PRODUCTS */}
        <Route path="/superadmin/products" element={<Products />} />
        <Route path="/superadmin/productsbyunits" element={<Products />} />

        {/* TRANSACTIONS */}
        <Route path="/superadmin/transactions" element={<Transactions />} />
        <Route path="/superadmin/viewtrxdetails" element={<ViewDetails />} />

        {/* CONFIG */}
        <Route path="/superadmin/config" element={<Config />} />

        <Route path="/unauth" element={<UnAuth />} />
        <Route path="*" element={<Error404 />} />
      </Route>
      {/* )} */}
    </Routes>
  );
};

export default MainRouter;
