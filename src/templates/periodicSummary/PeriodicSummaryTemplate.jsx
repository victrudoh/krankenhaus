import React, { useContext } from "react";
// import QRCode from "react-qr-code";
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
                <button onClick={() => printInvoice()}>
                  <i className="fas fa-print text-white mx-2"></i>Print Record
                </button>
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
                Time Period Report
              </i>
              <div className="my-2"></div>
              <h4>Krankenhaus</h4>
              <hr />
              <div className="my-5"></div>
              <h6>
                <b>Teller Details</b>
              </h6>
              <h4>
                <small>Name:</small> {user.firstName} {user.lastName}
              </h4>
              <h4>
                <small>Department:</small> {user.department}
              </h4>
              <br />
              <div className="my-3"></div>
              <h6>
                <b>Period Under Review</b>
              </h6>
              <h6>
                <small>From:</small>
                <small> {savedInvoice.data.From.slice(0, 25)}</small>
              </h6>
              <h6>
                <small>To:</small>
                <small> {savedInvoice.data.To.slice(0, 25)}</small>
              </h6>
              <br />
              <h6>
                <b>Payment Records</b>
              </h6>
              <h4>
                <small>No. of Transactions:</small> {savedInvoice.data.number}
              </h4>
              <h4>
                <small>Total Amount:</small> ₦{" "}
                {savedInvoice.data.amount.toLocaleString("en-US")}
              </h4>
              <br />
              <div className="my-3"></div>

              <p className="ms-3">Sign: ...........................</p>
              <hr />
              <div className="mb-4"></div>
              <h6>Print Date: {invoiceDate}</h6>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PeriodicSummaryTemplate;
