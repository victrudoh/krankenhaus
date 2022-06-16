import React, { useState } from "react";

// Styles
import { Wrapper } from "./DeptUnits.Styles";

// components
import UnitList from "./unitList/UnitList";
import AddUnit from "./addUnit/AddUnit";
import EditUnit from "./editUnit/EditUnit";

const DeptUnits = ({ setTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  setTitle("Department Units");
  return (
    <Wrapper>
      <UnitList setIsEditing={setIsEditing} />
      {isEditing ? (
        <>
          <EditUnit isEditing={isEditing} setIsEditing={setIsEditing} />
        </>
      ) : (
        <AddUnit />
      )}
    </Wrapper>
  );
};

export default DeptUnits;
