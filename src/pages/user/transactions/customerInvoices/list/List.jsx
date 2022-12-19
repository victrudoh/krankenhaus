import React, { useContext } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";

// Styles
import { Wrapper } from "./List.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const List = () => {
  const { loading, setLoading, invoiceCustomers, setSavedInvoice } =
    useContext(AppContext);

  let SN = 0;
  let totalPrice = 0;

  const getDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.onrender.com/transactions/${id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      console.log("response", response);
      if (response.status === 200) {
        success("Found payment");
        // show transaction details on screen
        setSavedInvoice({
          display: true,
          data: response.data.transaction,
          items: response.data.products,
        });
      }
    } catch (err) {
      error("Couldn't fetch details");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
            <table className="table table-hover caption-top text-center">
              <caption>Transaction History: Customers</caption>
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Date</th>
                  <th scope="col" colSpan={2}>
                    Customer
                  </th>
                  <th scope="col">Amount (₦)</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoiceCustomers.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{(SN = SN + 1)}</th>
                    <td>
                      {item.createdAt.split("T")[0]}...
                      {item.createdAt.split("T")[1].slice(0, 8)}
                    </td>
                    <td colSpan={2}>
                      {item.firstName} {item.lastName}
                    </td>
                    <td value={(totalPrice = totalPrice + item.total)}>
                      {item.total.toLocaleString("en-US")}
                    </td>
                    <td>
                      <button onClick={() => getDetails(item.id)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
                {invoiceCustomers.length > 0 ? (
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
                      <th>Total</th>
                      <th>₦ {totalPrice.toLocaleString("en-US")}</th>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default List;
