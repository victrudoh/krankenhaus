import { useContext } from "react";

// styles
import { Wrapper } from "./Available.Styles";

// components
import AvailableList from "./availableList/AvailableList";
import AddProduct from "./addProduct/addProduct/AddProduct";

const Available = () => {
  return (
    <>
      <Wrapper>
        <AvailableList />
        <AddProduct />
      </Wrapper>
    </>
  );
};

export default Available;
