import React from "react";

// Styles
import { Wrapper } from "./DeptPrivilege.Styles";

// components
import AddPrivilege from "./addPrivilege/AddPrivilege";
import PrivilegeList from "./privilegeList/PrivilegeList";

const DeptPrivilege = ({ setTitle }) => {
  setTitle("Department Privileges");
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
