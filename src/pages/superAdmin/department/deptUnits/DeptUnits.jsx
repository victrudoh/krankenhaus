import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper } from "./DeptUnits.Styles";

// components
import UnitList from "./unitList/UnitList";
import AddUnit from "./addUnit/AddUnit";
import EditUnit from "./editUnit/EditUnit";

const DeptUnits = () => {
  const { editUnit } = useContext(AppContext);
  return (
    <Wrapper>
      <UnitList />
      {editUnit.isEditingUnit ? <EditUnit /> : <AddUnit />}
    </Wrapper>
  );
};

export default DeptUnits;
