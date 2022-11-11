import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

// styles
import { Wrapper } from "./EndOfDayTemplate.Styles";

const EndOfDayTemplate = () => {
  const { user, savedInvoice, setSavedInvoice } = useContext(AppContext);
  console.log(
    "🚀 ~ file: EndOfDayTemplate.jsx ~ line 9 ~ EndOfDayTemplate ~ savedInvoice",
    savedInvoice
  );

  const getDate = new Date();
  var time =
    getDate.getHours() +
    ":" +
    getDate.getMinutes() +
    ":" +
    getDate.getSeconds();
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
                <button onClick={() => printInvoice()}>
                  <i className="fas fa-print text-white mx-2"></i>Print Report
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
                End of Day Report
              </i>
              <div className="my-2"></div>
              <h4>
                <b>Krankenhaus</b>
              </h4>
              <hr />
              <div className="my-5"></div>
              <h4>
                <b>Teller Details</b>
              </h4>
              <h5>
                <small>
                  Name: {user.firstName} {user.lastName}{" "}
                </small>
              </h5>
              <h5>
                <small>Department: {user.department}</small>
              </h5>
              <br />
              <div className="my-2"></div>
              <h4>
                <b>Date Under Review</b>
              </h4>
              <h6>
                <small> {savedInvoice.data.message?.slice(27, 57)}</small>
              </h6>
              <br />
              <h4>
                <b>Payment Records</b>
              </h4>
              <div className="my-3"></div>
              <h6>
                <b>Paid Invoices:</b>
              </h6>
              <h5>
                <small>No. of Transactions:</small>{" "}
                {savedInvoice.data.totalPaid}
              </h5>
              <h5>
                <small>Total Amount:</small> ₦{" "}
                {savedInvoice.data.paidAmount.toLocaleString("en-US")}
              </h5>
              <br />
              <h6>
                <b>Unpaid Invoices:</b>
              </h6>
              <h5>
                <small>No. of Transactions:</small>{" "}
                {savedInvoice.data.totalNotPaid}
              </h5>
              <h5>
                <small>Total Amount:</small> ₦{" "}
                {savedInvoice.data.notPaidAmount.toLocaleString("en-US")}
              </h5>
              <br />
              <div className="my-3"></div>

              <p className="ms-3">Sign: ...............................</p>
              <hr />
              <div className="mb-4"></div>
              <h6>
                <small>
                  Print Date: {invoiceDate} at {time}
                </small>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EndOfDayTemplate;
