import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../../context/AppContext";
import axios from "axios";

// styles
import { Wrapper, Top } from "./ItemList.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const ItemList = () => {
  const { loading, setLoading, invoiceUser, setInvoiceUser, setSavedInvoice } =
    useContext(AppContext);

  const [invoice, setInvoice] = useState({
    firstName: "",
    lastName: "",
    items: [],
  });

  let SN = 0;
  let totalPrice = 0;

  const generateInvoice = async () => {
    try {
      setLoading(true);
      console.log("invoiceUser", invoiceUser);
      const response = await axios.post(
        "https://hospital-ms-api.herokuapp.com/transactions/new",
        invoiceUser,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      console.log("generateInvoice ~ response", response);
      setSavedInvoice({
        display: true,
        data: response.data.invoice,
        items: response.data.items,
      });
      setInvoiceUser({
        foundInvoiceUser: false,
        firstName: "",
        lastName: "",
        items: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      console.log("deleteHandler ~ id", id);
      const response = await axios.delete(
        `https://hospital-ms-api.herokuapp.com/transactions/delete-item?id=${id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(
        "🚀 ~ file: ItemList.jsx ~ line 69 ~ deleteHandler ~ response",
        response
      );
      // fake delete from frontend so it disappears instead of reloading the whole page again since it's no longer inn the db
      invoiceUser.items.pop(id);
      setInvoice({
        firstName: invoiceUser.firstName,
        lastName: invoiceUser.lastName,
        items: invoiceUser.items,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: ItemList.jsx ~ line 60 ~ deleteHandler ~ error",
        error
      );
    }
  };

  useEffect(() => {
    setInvoice({
      firstName: invoiceUser.firstName,
      lastName: invoiceUser.lastName,
      items: invoiceUser.items,
    });
  }, []);

  return (
    <>
      <Wrapper>
        <Top>
          <div className="pair">
            <label>First name: </label>
            <h4>{invoiceUser.firstName}</h4>
          </div>
          <div className="pair">
            <label>Last name: </label>
            <h4>{invoiceUser.lastName}</h4>
          </div>
        </Top>
        <table className="table caption-top">
          <caption>List of items</caption>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Description</th>
              <th scope="col">Department</th>
              <th scope="col">Qty</th>
              <th scope="col">Price (₦)</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceUser.items.map((item, i) => (
              <tr key={i}>
                <th scope="row">{(SN = SN + 1)}</th>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.quantity}</td>
                <td value={(totalPrice = totalPrice + item.price)}>
                  {item.price.toFixed(2)}
                </td>
                <td>
                  <button onClick={() => deleteHandler(i)}>Delete</button>
                </td>
              </tr>
            ))}
            {invoiceUser.items.length > 0 ? (
              <>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th>Total:</th>
                  <td>{totalPrice.toFixed(2)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    {loading ? (
                      <CircleSpinner />
                    ) : (
                      <>
                        <button onClick={() => generateInvoice()}>Done</button>
                      </>
                    )}
                  </td>
                </tr>
              </>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default ItemList;
