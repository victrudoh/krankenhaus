import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../../../context/AppContext";

// styles
import { Top, Wrapper } from "./Department.Styles";

// components
import DeptList from "./deptList/DeptList";
import AddDept from "./addDept/AddDept";
import EditDept from "./editDept/EditDept";

const Department = () => {
  const { user } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Top>
        <NavLink to="/superadmin/deptunits">View units</NavLink>
      </Top>
      <Wrapper>
        <DeptList isEditing={isEditing} setIsEditing={setIsEditing} />
        {user.role !== "admin_read_only" && (
          <>
            {isEditing ? (
              <>
                <EditDept isEditing={isEditing} setIsEditing={setIsEditing} />
              </>
            ) : (
              <AddDept />
            )}
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Department;
