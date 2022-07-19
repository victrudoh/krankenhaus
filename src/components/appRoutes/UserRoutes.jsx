// Dependencies
import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Layed from "../Layed";
import Error404 from "../../pages/error404/Error404";
import UnAuth from "../../pages/unAuth/UnAuth";

import CreateInvoice from "../../pages/user/createInvoice/CreateInvoice";
import TrackPayment from "../../pages/user/trackPayment/TrackPayment";
import Transactions from "../../pages/user/transactions/Transactions";
import Config from "../../pages/user/config/Config";
import EndOfDay from "../../pages/print/endOfDaySummary/EndOfDay";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layed />}>
        <Route index element={<CreateInvoice />} />
        <Route path="/user/invoice" element={<CreateInvoice />} />
        <Route path="/user/payment" element={<TrackPayment />} />
        <Route path="/user/transactions" element={<Transactions />} />
        <Route path="/user/config" element={<Config />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
