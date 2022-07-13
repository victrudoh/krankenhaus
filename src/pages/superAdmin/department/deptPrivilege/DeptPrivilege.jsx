import React from "react";

// Styles
import { Wrapper } from "./DeptPrivilege.Styles";

// components
import AddPrivilege from "./addPrivilege/AddPrivilege";
import PrivilegeList from "./privilegeList/PrivilegeList";

const DeptPrivilege = () => {
  return (
    <>
      <Wrapper>
        <PrivilegeList />
        <AddPrivilege />
      </Wrapper>
    </>
  );
};

export default DeptPrivilege;
