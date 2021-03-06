import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// styles
import { Top, Wrapper } from "./Department.Styles";

// components
import DeptList from "./deptList/DeptList";
import AddDept from "./addDept/AddDept";
import EditDept from "./editDept/EditDept";

const Department = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Top>
        <NavLink to="/superadmin/deptunits">View units</NavLink>
      </Top>
      <Wrapper>
        <DeptList isEditing={isEditing} setIsEditing={setIsEditing} />
        {isEditing ? (
          <>
            <EditDept isEditing={isEditing} setIsEditing={setIsEditing} />
          </>
        ) : (
          <AddDept />
        )}
      </Wrapper>
    </>
  );
};

export default Department;
