import React, { useContext } from "react";
import QRCode from "react-qr-code";
import AppContext from "../../context/AppContext";

// Styles
import { Wrapper } from "./PeriodicSummaryTemplate.Styles";

const PeriodicSummaryTemplate = () => {
  const { user, savedInvoice, setSavedInvoice } = useContext(AppContext);

  const getDate = new Date();
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
  console.log(
    "🚀 ~ file: PeriodicSummaryTemplate.jsx ~ line 33 ~ PeriodicSummaryTemplate ~ invoiceDate",
    invoiceDate
  );

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

            {/* <img src={savedInvoice.data.badcode} alt="barcode" /> */}

            <div className="container printInvoice" id="printInvoice">
              <div className="col-md-12">
                <div className="text-center">
                  <i
                    className="fab fa-2x ms-0 mt-2"
                    style={{ color: "#000080" }}
                  >
                    Krankenhaus
                  </i>
                  <p></p>
                  <p className="pt-0">Time Period Report</p>
                </div>
              </div>

              <div className="my-2"></div>

              <div className="row">
                <div className="col-xl-9 mt-4">
                  <h5>Teller Details</h5>
                  <ul className="list-unstyled">
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle  mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="fw-bold">Name: </span>
                      <h5 className="mx-2">
                        {user.firstName} {user.lastName}
                      </h5>
                    </li>
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="fw-bold">Department: </span>
                      <h5 className="mx-2">{user.department}</h5>
                    </li>
                    <br />
                    <h5>Period Under Review</h5>
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="fw-bold">From: </span>
                      <h5 className="mx-2">{savedInvoice.data.From}</h5>
                    </li>
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="fw-bold">To: </span>
                      <h5 className="mx-2">{savedInvoice.data.To}</h5>
                    </li>
                    <br />
                    <h5>Payment Records</h5>
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="fw-bold">No. of Transactions:</span>
                      <h5 className="mx-2">{savedInvoice.data.number}</h5>
                    </li>
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="fw-bold">Amount:</span>
                      <h5 className="mx-2">
                        {savedInvoice.data.amount.toFixed(2)}
                      </h5>
                    </li>
                  </ul>
                </div>
                {/* <div className="col-xl-3 ml-3">
                  <QRCode value={savedInvoice.data.id} size={130} />
                </div> */}
              </div>

              <div className="my-5"></div>

              <div className="my-5"></div>
              <div className="row">
                <div className="col-xl-7">
                  <p className="ms-3">Sign: ...........................</p>
                  <div className="mb-4"></div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-xl-9">
                  <p>Print Date: {invoiceDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PeriodicSummaryTemplate;
