import React, { useState } from "react";

// Styles
import { Wrapper } from "./Dashboard.Styles";

// Components
import Overview from "./overview/Overview";
import ActivityLog from "../users/userLogs/activityLog/ActivityLog";
import Chart from "./chart/Chart";
import Spinner from "../../../components/spinner/Spinner";

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
            {/* <Chart /> */}
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Dashboard;
