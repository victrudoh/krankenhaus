import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

// styles
import { Wrapper } from "./CreateInvoice.Styles";

// components
import ItemList from "./itemList/ItemList";
import UserDetails from "./userDetails/UserDetails";
import AddItem from "./addItem/AddItem";

const CreateInvoice = () => {
  const { invoiceUser } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        <ItemList />
        {invoiceUser.foundInvoiceUser === false ? <UserDetails /> : <AddItem />}
      </Wrapper>
    </>
  );
};

export default CreateInvoice;
