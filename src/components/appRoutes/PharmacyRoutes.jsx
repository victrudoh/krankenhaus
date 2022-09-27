import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AppContext from "../../context/AppContext";

// Pages
import Layed from "../Layed";
import Error404 from "../../pages/error404/Error404";

// Admin
import Dashboard from "../../pages/pharmacyAdmin/dashboard/Dashboard";
import Products from "../../pages/pharmacyAdmin/products/Products";
import Suppliers from "../../pages/pharmacyAdmin/suppliers/Suppliers";
import Units from "../../pages/pharmacyAdmin/units/Units";
import MeasuringUnit from "../../pages/pharmacyAdmin/measuringUnit/MeasuringUnit";

// User
import PendingProducts from "../../pages/pharmacyUser/pendingProducts/PendingProducts";
import CreateInvoice from "../../pages/user/createInvoice/CreateInvoice";
import TrackPayment from "../../pages/user/trackPayment/TrackPayment";

const PharmacyRoutes = () => {
  const { user } = useContext(AppContext);
  return (
    <Routes>
      <Route path="/" element={<Layed />}>
        {user.role === "user" ? (
          <>
            <Route index element={<Dashboard />} />
            <Route path="/pharm-unit/products" element={<Products />} />
            <Route path="/pharm-unit/pending" element={<PendingProducts />} />
            <Route path="/pharm-unit/invoice" element={<CreateInvoice />} />
            <Route path="/pharm-unit/payment" element={<TrackPayment />} />
            <Route path="*" element={<Error404 />} />
          </>
        ) : (
          <>
            <Route index element={<Dashboard />} />
            <Route path="/pharmacyadmin/products" element={<Products />} />
            <Route path="/pharmacyadmin/suppliers" element={<Suppliers />} />
            <Route path="/pharmacyadmin/stores" element={<Units />} />
            <Route
              path="/pharmacyadmin/measuring_units"
              element={<MeasuringUnit />}
            />
            {/* <Route path="/teller/config" element={<Config />} /> */}
            <Route path="*" element={<Error404 />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default PharmacyRoutes;
