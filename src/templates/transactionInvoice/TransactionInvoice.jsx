import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import QRCode from "react-qr-code";

// styles
import { Wrapper } from "./TransactionInvoice.Styles";

const TransactionInvoice = () => {
  const { user, savedInvoice, setSavedInvoice } = useContext(AppContext);

  let totalPrice = 0;

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

  const printInvoice = () => {
    var printContents = document.getElementById("printInvoice").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };
  return (
    <Wrapper>
      <div className="card">
        <div className="card-body">
          <div className="container mb-5 mt-3">
            <div className="row d-flex align-items-baseline">
              <div className="col-xl-6 w-100 d-flex justify-content-between align-items-center mb-2">
                {user.role !== "teller" ? (
                  <button onClick={() => printInvoice()}>
                    <i className="fas fa-print text-white mx-2"></i>Print
                    invoice
                  </button>
                ) : (
                  <div></div>
                )}
                <i
                  className="bx bx-x-circle"
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    color: "#000080",
                  }}
                  onClick={closeHandler}
                ></i>
              </div>
              <hr />
            </div>

            <div className="container printInvoice" id="printInvoice">
              <i className="fab fa-1x ms-0 mt-2" style={{ color: "#000080" }}>
                Krankenhaus
              </i>
              <div className="my-2"></div>
              <h4>Payment Invoice</h4>

              <hr />

              <div className="my-2"></div>
              <h6>
                <b>Transaction Details</b>
              </h6>
              <h5>
                <small>Name:</small> {savedInvoice.data.firstName}{" "}
                {savedInvoice.data.lastName}
              </h5>
              <h5>
                <small>Transaction Id:</small> {savedInvoice.data.id}
              </h5>
              <h5>
                <small>Creation Date:</small> {invoiceDate}
              </h5>
              <br />
              <QRCode value={savedInvoice.data.id} size={130} />
              <br />
              <div className="my-5"></div>
              <table className="table table-striped">
                <thead
                  style={{ backgroundColor: "#000080" }}
                  className="text-white text-center"
                >
                  <tr>
                    <th scope="col">Qty</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount (₦)</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {savedInvoice.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.quantity}</td>
                      <td>{item.name}</td>
                      <td value={(totalPrice = totalPrice + item.price)}>
                        {item.price.toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="my-5"></div>
              <h5>
                <b>Total Price:</b> ₦{totalPrice.toLocaleString("en-US")}
              </h5>
              <div className="my-3"></div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default TransactionInvoice;
