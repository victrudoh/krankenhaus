import React, { useState } from "react";

// Styles
import { Wrapper } from "./Dashboard.Styles";

// Components
import Overview from "./overview/Overview";
import ActivityLog from "../users/userLogs/activityLog/ActivityLog";
import Chart from "./chart/Chart";
import Spinner from "../../../components/spinner/Spinner";
import TrxChart from "../../../components/trxChart/TrxChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Wrapper>
        {/*  */}
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Overview />
            <ActivityLog />
            {/* <TrxChart /> */}
            {/* <Chart /> */}
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Dashboard;
