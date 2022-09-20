import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

// Styles
import { Wrapper } from "./MeasuringUnit.Styles";

// components
import Panel from "./panel/Panel";
import List from "./list/List";
import Edit from "./edit/Edit";

const MeasuringUnit = () => {
  const { editMeasuringUnit } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        <List />
        {editMeasuringUnit.editing ? (
          <>
            <Edit />
          </>
        ) : (
          <Panel />
        )}
      </Wrapper>
    </>
  );
};

export default MeasuringUnit;
