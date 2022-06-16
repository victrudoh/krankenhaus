import React from "react";

// Styles
import { Wrapper } from "./ActivityLog.Styles";

const ActivityLog = () => {
  return (
    <>
      <Wrapper>
        <table className="table table-striped caption-top">
          <caption>Log of user activities</caption>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Action</th>
              <th scope="col">Description</th>
              <th scope="col">Time</th>
              <th scope="col">User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Login</td>
              <td>user Mark Joseph logged in as superadmin</td>
              <td>2022=03-12</td>
              <td>Mark Joseph</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Login</td>
              <td>user Roxxy Smith logged in as admin</td>
              <td>2022=03-12</td>
              <td>Roxxy Smith</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default ActivityLog;
