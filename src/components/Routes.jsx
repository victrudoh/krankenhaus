// Dependencies
import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Layed from "./Layed";
import UnAuth from "../pages/unAuth/UnAuth";
import Error404 from "../pages/error404/Error404";
import Login from "../pages/login/Login";

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

const MainRouter = ({ title, setTitle }) => {
  return (
    <Routes>
      <Route path="/" element={<Layed />}>
        <Route
          index
          element={<Dashboard title={title} setTitle={setTitle} />}
        />

        {/* LOGIN */}
        {/* <Route
          path="/login"
          element={<Login title={title} setTitle={setTitle} />}
        /> */}

        {/* USERS */}
        <Route
          path="/superadmin/users"
          element={<Users title={title} setTitle={setTitle} />}
        />
        <Route
          path="/superadmin/userlogs"
          element={<UserLogs title={title} setTitle={setTitle} />}
        />

        {/* DEPARTMENT */}
        <Route
          path="/superadmin/department"
          element={<Department title={title} setTitle={setTitle} />}
        />
        <Route
          path="/superadmin/deptunits"
          element={<DeptUnits title={title} setTitle={setTitle} />}
        />
        <Route
          path="/superadmin/deptprivilege"
          element={<DeptPrivilege title={title} setTitle={setTitle} />}
        />
        <Route
          path="/superadmin/viewunit"
          element={<ViewUnit title={title} setTitle={setTitle} />}
        />

        {/* PRODUCTS */}
        <Route
          path="/superadmin/products"
          element={<Products title={title} setTitle={setTitle} />}
        />
        <Route
          path="/superadmin/productsbyunits"
          element={<Products title={title} setTitle={setTitle} />}
        />

        {/* TRANSACTIONS */}
        <Route
          path="/superadmin/transactions"
          element={<Transactions title={title} setTitle={setTitle} />}
        />
        <Route
          path="/superadmin/viewtrxdetails"
          element={<ViewDetails title={title} setTitle={setTitle} />}
        />

        {/* CONFIG */}
        <Route
          path="/superadmin/config"
          element={<Config setTitle={setTitle} />}
        />

        <Route
          path="/unauth"
          element={<UnAuth title={title} setTitle={setTitle} />}
        />
        <Route
          path="*"
          element={<Error404 title={title} setTitle={setTitle} />}
        />
      </Route>
    </Routes>
  );
};

export default MainRouter;
