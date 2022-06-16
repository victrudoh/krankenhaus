import React from "react";

// Styles
import { Wrapper } from "./UserLogs.Styles";

// components
import ActivityLog from "./activityLog/ActivityLog";
import ActivityPanel from "./panel/ActivityPanel";

const UserLogs = ({ setTitle }) => {
  setTitle("User logs");
  return (
    <>
      <Wrapper>
        <ActivityLog />
        <ActivityPanel />
      </Wrapper>
    </>
  );
};

export default UserLogs;
