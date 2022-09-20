import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

// styles
import { Wrapper } from "./Units.Styles";

// components
import UnitList from "./unitList/UnitList";
import AddUnit from "./addUnit/AddUnit";
import EditUnit from "./editUnit/EditUnit";

const Units = () => {
  const { editInventoryUnit } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        <UnitList />
        {editInventoryUnit.isEditingUnit ? <EditUnit /> : <AddUnit />}
      </Wrapper>
    </>
  );
};

export default Units;
