import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

// styles
import { Wrapper } from "./CreateInvoice.Styles";

// components
import ItemList from "./itemList/ItemList";
import UserDetails from "./userDetails/UserDetails";
import AddItem from "./addItem/AddItem";
import ViewInvoice from "./viewInvoice/ViewInvoice";

const CreateInvoice = () => {
  const { invoiceUser, savedInvoice } = useContext(AppContext);

  return (
    <>
      <Wrapper>
        {savedInvoice.display === false ? (
          <>
            <ItemList />
            {invoiceUser.foundInvoiceUser === false ? (
              <UserDetails />
            ) : (
              <AddItem />
            )}
          </>
        ) : (
          <>
            <ViewInvoice />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default CreateInvoice;
