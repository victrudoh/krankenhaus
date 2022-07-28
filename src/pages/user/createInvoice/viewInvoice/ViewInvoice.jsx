import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext";
import Barcode from "react-barcode";

// Styles
import { Wrapper, Top, Head } from "./ViewInvoice.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const ViewInvoice = () => {
  const { loading, savedInvoice, setSavedInvoice } = useContext(AppContext);
  console.log("savedInvoice", savedInvoice);

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
    <Wrapper>
      <div className="card">
        <div className="card-body">
          <div className="container mb-5 mt-3">
            <div className="row d-flex align-items-baseline">
              {/* <div className="col-xl-6">
                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                  Invoice >> <strong>ID: #123-123</strong>
                </p>
              </div> */}
              <div className="col-xl-6">
                <a
                  className="btn btn-light text-capitalize border-0"
                  data-mdb-ripple-color="dark"
                >
                  <i className="fas fa-print text-primary"></i> Print
                </a>
              </div>
              <hr />
            </div>

            <div className="container">
              <div className="col-md-12">
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

              <div className="row">
                <div className="col-xl-7">
                  {/* <p className="text-muted">Invoice</p> */}
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
                      <h5 className="mx-2">
                        {savedInvoice.data.createdAt.slice(0, 10)}
                      </h5>
                    </li>
                    <li className="text-muted d-flex align-items-center">
                      <i
                        className="fas fa-circle mx-1"
                        style={{ color: "#000080" }}
                      ></i>{" "}
                      <span className="me-1 fw-bold">Status:</span>
                      {savedInvoice.data.status === "not-paid" ? (
                        <span className="badge bg-warning text-black fw-bold">
                          {savedInvoice.data.status}
                        </span>
                      ) : (
                        <span className="badge bg-success text-white fw-bold">
                          {savedInvoice.data.status}
                        </span>
                      )}
                    </li>
                  </ul>
                </div>
                <div class="col-xl-5">
                  <Barcode value={savedInvoice.data.id} />
                </div>
              </div>

              <div className="row mt-4 my-2 mx-1 justify-content-center">
                <table className="table table-striped table-borderless">
                  <thead
                    style={{ backgroundColor: "#000080" }}
                    className="text-white"
                  >
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Description</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedInvoice.items.map((item, i) => (
                      <tr key={i}>
                        <th scope="row">{(SN = SN + 1)}</th>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{(item.price / item.quantity).toFixed(2)}</td>
                        <td value={(totalPrice = totalPrice + item.price)}>
                          {item.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-xl-6">
                  {/* <p className="ms-3">
                    Additional notes and payment information:
                  </p> */}
                </div>
                <div className="col-xl-5">
                  <p className="text-black float-end">
                    <span className="text-black me-3">Total Amount</span>
                    <span style={{ fontSize: "25px" }}>
                      {totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-7">
                  <p className="ms-3">
                    Additional notes and payment information:
                  </p>
                </div>
                {/* <div className="col-xl-5">
                  <p className="text-black float-start">
                    <span className="text-black me-3"> Total Amount</span>
                    <span style={{ fontSize: "25px" }}>
                      {totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div> */}
              </div>
              <hr />
              <div className="row">
                <div className="col-xl-9">
                  <p>Thank you for your purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );

  // return (
  //   <>
  //     <Wrapper>
  //       <Head>
  //         <h5>Invoice</h5>
  //         <i classNameName="bx bx-x-circle" onClick={closeHandler}></i>
  //       </Head>
  //       <hr />
  //       <Top>
  //         <div classNameName="pair">
  //           <label>Name: </label>
  //           <h4>
  //             {savedInvoice.data.firstName} {savedInvoice.data.lastName}
  //           </h4>
  //         </div>
  //       </Top>
  //       <Top>
  //         <div classNameName="pair">
  //           <label>Date: </label>
  //           <h4>{invoiceDate}</h4>
  //         </div>
  //       </Top>
  //       <Top>
  //         <div classNameName="pair">
  //           <label>Transaction Id: </label>
  //           <h4>{savedInvoice.data.id}</h4>
  //         </div>
  //       </Top>
  //       {loading ? (
  //         <CircleSpinner />
  //       ) : (
  //         <>
  //           <table classNameName="table caption-top my-5">
  //             {/* <caption>List of items</caption> */}
  //             <thead>
  //               <tr>
  //                 <th scope="col">S/N</th>
  //                 <th scope="col">Description</th>
  //                 <th scope="col">Department</th>
  //                 <th scope="col">Qty</th>
  //                 <th scope="col">Price (₦)</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {savedInvoice.items.map((item, i) => (
  //                 <tr key={i}>
  //                   <th scope="row">{(SN = SN + 1)}</th>
  //                   <td>{item.name}</td>
  //                   <td>{item.department}</td>
  //                   <td>{item.quantity}</td>
  //                   <td value={(totalPrice = totalPrice + item.price)}>
  //                     {item.price}
  //                   </td>
  //                 </tr>
  //               ))}
  //               {/* <tr>
  //                 <td></td>
  //                 <td></td>
  //                 <td></td>
  //                 <td></td>
  //                 <td></td>
  //               </tr> */}
  //               <tr>
  //                 <td></td>
  //                 <td></td>
  //                 <td></td>
  //                 <th>Total:</th>
  //                 <td>{totalPrice}</td>
  //               </tr>
  //               <tr>
  //                 <td></td>
  //                 <td></td>
  //                 <td></td>
  //                 <td></td>
  //                 <td>
  //                   <button onClick={printHandler}>Print invoice</button>
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </>
  //       )}
  //     </Wrapper>
  //   </>
  // );
};

export default ViewInvoice;
