import { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// styles
import { Wrapper } from "./Available.Styles";

// components
import AvailableList from "./availableList/AvailableList";
import AddProduct from "./addProduct/addProduct/AddProduct";
import EditProducts from "./editProducts/EditProducts";
import ViewProduct from "./viewProduct/ViewProduct";

const Available = () => {
  const { editInventoryProduct } = useContext(AppContext);

  const SidePanel = () => {
    if (editInventoryProduct.action === "edit") {
      return <EditProducts />;
    } else if (editInventoryProduct.action === "view") {
      return <ViewProduct />;
    } else if (editInventoryProduct.action === "") {
      return <AddProduct />;
    }
  };

  return (
    <>
      <Wrapper>
        <AvailableList />
        <SidePanel />
      </Wrapper>
    </>
  );
};

export default Available;
