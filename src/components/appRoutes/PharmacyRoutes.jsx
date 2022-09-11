import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Layed from "../Layed";
import Error404 from "../../pages/error404/Error404";
import Dashboard from "../../pages/pharmacyAdmin/dashboard/Dashboard";
import Products from "../../pages/pharmacyAdmin/products/Products";

const PharmacyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layed />}>
        <Route index element={<Dashboard />} />
        <Route path="/pharmacyadmin/products" element={<Products />} />
        {/* <Route path="/teller/transactions" element={<Transactions />} /> */}
        {/* <Route path="/teller/config" element={<Config />} /> */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default PharmacyRoutes;
