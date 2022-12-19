import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../../../context/AppContext";
// import axios from "axios";
// import { error } from "../../../../../../helpers/Alert";

// Styles
import { Wrapper, Top, Head } from "./ViewDetails.Styles";

const ViewDetails = () => {
  const { getDetails, setGetDetails } = useContext(AppContext);
  // const [invoiceCreator, setInvoiceCreator] = useState;

  // Get active user
  // const getInvoiceCreator = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://hospital-ms-api.onrender.com/users/${getDetails.data.creator}`,
  //       {
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setInvoiceCreator(response.data);
  //   } catch (err) {
  //     error("Ooops! couldn't fetch invoice creator");
  //     console.log("~ activeUser ~ error", error);
  //   }
  // };

  const close = () => {
    setGetDetails({
      display: false,
      data: {},
      items: [],
    });
  };

  // useEffect(() => {
  // getInvoiceCreator();
  // });

  return (
    <>
      <Wrapper>
        <Head>
          <h4>
            Transaction detail: {getDetails.data.firstName}{" "}
            {getDetails.data.lastName}
          </h4>
          <i className="bx bx-x-circle" onClick={close}></i>
        </Head>
        <hr />
        <Top>
          <h4>Status: Paid</h4>
          <h4>Invoice by: Tes Test</h4>
          <h4>Paid in by: Bank Bank</h4>
        </Top>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Description</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Abidec SYR</td>
              <td>1</td>
              <td>4000.00</td>
              <td>4000.00</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Abidec SYR</td>
              <td>2</td>
              <td>4000.00</td>
              <td>4000.00</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default ViewDetails;
