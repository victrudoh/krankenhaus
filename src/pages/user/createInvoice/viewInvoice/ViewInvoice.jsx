import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";

// Styles
import { Wrapper, Top, Head } from "./ViewInvoice.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const ViewInvoice = () => {
  const { loading, savedInvoice, setSavedInvoice } = useContext(AppContext);

  let totalPrice = 0;
  let SN = 0;

  const getDate = new Date(savedInvoice.data.createdAt);
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateString = getDate.toString();
  const day = dateString.slice(0, 3);
  let month = monthList[getDate.getMonth()];
  let date = getDate.getDate();
  let year = getDate.getFullYear();

  let invoiceDate = `${day} ${month} ${date}, ${year}`;

  const closeHandler = () => {
    setSavedInvoice({
      ...savedInvoice,
      display: false,
    });
  };

  const printHandler = () => {
    // Run print stuff first sha
    setSavedInvoice({
      ...savedInvoice,
      display: false,
    });
  };

  return (
    <>
      <Wrapper>
        <Head>
          <h4>Invoice</h4>
          <i className="bx bx-x-circle" onClick={closeHandler}></i>
        </Head>
        <hr />
        <Top>
          <div className="pair">
            <label>Name: </label>
            <h4>
              {savedInvoice.data.firstName} {savedInvoice.data.lastName}
            </h4>
          </div>
        </Top>
        <Top>
          <div className="pair">
            <label>Date: </label>
            <h4>{invoiceDate}</h4>
          </div>
        </Top>
        <Top>
          <div className="pair">
            <label>Transaction Id: </label>
            <h4>{savedInvoice.data.id}</h4>
          </div>
        </Top>
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
            <table className="table caption-top my-5">
              {/* <caption>List of items</caption> */}
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Description</th>
                  <th scope="col">Department</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price (₦)</th>
                </tr>
              </thead>
              <tbody>
                {savedInvoice.items.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{(SN = SN + 1)}</th>
                    <td>{item.name}</td>
                    <td>{item.department}</td>
                    <td>{item.quantity}</td>
                    <td value={(totalPrice = totalPrice + item.price)}>
                      {item.price}
                    </td>
                  </tr>
                ))}
                {/* <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr> */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th>Total:</th>
                  <td>{totalPrice}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button onClick={printHandler}>Print invoice</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ViewInvoice;
