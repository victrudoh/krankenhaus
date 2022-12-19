import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { error } from "../../helpers/Alert";

// styles
import { Wrapper, Head, Top } from "./ViewDetails.Styles";

const ViewDetails = () => {
  const { getDetails, setGetDetails } = useContext(AppContext);
  const [invoiceCreator, setInvoiceCreator] = useState({});
  const [teller, setTeller] = useState({});

  let SN = 0;
  let totalPrice = 0;

  // Get invoice creator
  const getInvoiceCreator = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.onrender.com/users/${getDetails.data.creator}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInvoiceCreator(response.data);
    } catch (err) {
      error("Ooops! couldn't fetch invoice creator");
      // console.log("~ getInvoiceCreator ~ error", error);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // Get teller
  const getTeller = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.onrender.com/users/${getDetails.data.teller}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTeller(response.data);
    } catch (err) {
      error("Ooops! couldn't fetch teller");
      // console.log("~ getTeller ~ error", error);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const close = () => {
    setGetDetails({
      display: false,
      data: {},
      items: [],
    });
  };

  useEffect(() => {
    getInvoiceCreator();
    getTeller();
  }, []);

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
          <div className="pair">
            <h3>Transaction by:</h3>
            <h3>
              {invoiceCreator.firstName} {invoiceCreator.lastName}
            </h3>
          </div>
          <div className="pair">
            <h3>Paid in by: </h3>
            <h3>
              {teller.firstName
                ? `${teller.firstName} ${teller.lastName}`
                : "No Teller"}
            </h3>
          </div>
        </Top>
        <Top>
          <div className="pair">
            <h3>Status:</h3>
            <h3>{getDetails.data.status}</h3>
          </div>
        </Top>
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Description</th>
              <th scope="col">Qty</th>
              <th scope="col">Price (₦)</th>
            </tr>
          </thead>
          <tbody>
            {getDetails.items.map((item, i) => (
              <tr key={i}>
                <th scope="row">{(SN = SN + 1)}</th>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td value={(totalPrice = totalPrice + item.price)}>
                  {item.price.toLocaleString("en-US")}
                </td>
              </tr>
            ))}
            <tr>
              <th></th>
              <th></th>
              <th>Total</th>
              <th>₦ {totalPrice.toLocaleString("en-US")}</th>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default ViewDetails;
