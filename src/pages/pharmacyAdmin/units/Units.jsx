import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

// styles
import { Wrapper } from "./Units.Styles";

// components
import UnitList from "./unitList/UnitList";
import AddUnit from "./addUnit/AddUnit";
import EditUnit from "./editUnit/EditUnit";
import SendProducts from "./sendProducts/SendProducts";

const Units = () => {
  const { editInventoryUnit } = useContext(AppContext);

  const SelectedDisplay = () => {
    if (editInventoryUnit.action === "add") {
      return <AddUnit />;
    } else if (editInventoryUnit.action === "edit") {
      return <EditUnit />;
    } else if (editInventoryUnit.action === "send") {
      return <SendProducts />;
    } else {
      return <AddUnit />;
    }
  };

  return (
    <>
      <Wrapper>
        <UnitList />
        <SelectedDisplay />
      </Wrapper>
    </>
  );
};

export default Units;
