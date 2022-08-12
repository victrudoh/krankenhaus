import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";

// Styles
import { Wrapper, Top, Head } from "./ViewInvoice.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const ViewInvoice = () => {
  const { user, savedInvoice, setSavedInvoice } = useContext(AppContext);
  console.log(
    "🚀 ~ file: ViewInvoice.jsx ~ line 13 ~ ViewInvoice ~ user",
    user
  );

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
                {/* {totalPrice.toFixed(2).toLocaleString("en-US")} */}
              </h5>
              <div className="my-3"></div>

              {/* <div className="col-md-12">
                <div className="text-center">
                  <i
                    className="fab fa-2x ms-0 mt-2"
                    style={{ color: "#000080" }}
                  >
                    Krankenhaus
                  </i>
                  <p></p>
                  <p className="pt-0">Payment Invoice</p>
                </div>
              </div>
              <div className="my-5"></div>
              <div className="row">
                <div className="col-xl-9 mt-4">
                  <ul className="list-unstyled">
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle  mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="fw-bold">To: </span>
                      <h5 className="mx-2">
                        {savedInvoice.data.firstName}{" "}
                        {savedInvoice.data.lastName}
                      </h5>
                    </li>
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="fw-bold">ID: </span>
                      <h5 className="mx-2">{savedInvoice.data.id}</h5>
                    </li>
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="fw-bold">Creation Date: </span>
                      <h5 className="mx-2">{invoiceDate}</h5>
                    </li>
                  </ul>
                </div>
                <div className="col-xl-3 ml-3">
                  <QRCode value={savedInvoice.data.id} size={130} />
                </div>
              </div>
              <div className="my-5"></div> */}
              {/* <div className="row mt-4 my-2 mx-1 justify-content-center">
                <table className="table table-striped table-borderless">
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
                          {item.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
              {/* <div className="row">
                <div className="col-xl-6"></div>
                <div className="col-xl-5 d-flex justify-content-end">
                  <p className="text-black">
                    <span
                      className="text-black me-3"
                      style={{ fontSize: "22px" }}
                    >
                      Total price:
                    </span>
                    <span style={{ fontSize: "22px", fontWeight: "500" }}>
                      ₦{totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewInvoice;
