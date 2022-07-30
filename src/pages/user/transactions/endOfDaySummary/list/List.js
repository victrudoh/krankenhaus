import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../../context/AppContext";

// styles
import { Wrapper, Top } from "./List.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const List = () => {
  const { loading, user, endOfDay } = useContext(AppContext);
  const [paid, setPaid] = useState([]);
  const [unPaid, setUnPaid] = useState([]);

  const filtered = async () => {
    // get paid
    const filteredPaid = await endOfDay.transactions.filter((item) => {
      return !item.status.includes("not");
    });
    setPaid(filteredPaid);

    // get unpaid
    const filteredUnPaid = await endOfDay.transactions.filter((item) => {
      return item.status.includes("not");
    });
    setUnPaid(filteredUnPaid);
  };

  const printInvoice = () => {
    var printContents = document.getElementById("printInvoice").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  useEffect(() => {
    filtered();
  }, [endOfDay]);

  return (
    <>
      <Wrapper>
        <div>Print End of day summary</div>
        {loading ? (
          <CircleSpinner />
        ) : (
          <>
            <div className="printInvoice" id="printInvoice">
              <h2 className="my-4">End of Day Report</h2>
              <Top>
                <div className="pair">
                  <h5>Name:</h5>
                  <h5>
                    {user.firstName} {user.lastName}
                  </h5>
                </div>
                <div className="pair">
                  <h5>Department:</h5>
                  <h5>{user.department}</h5>
                </div>
                <div className="pair">
                  <h5>Date under review:</h5>
                  <h6>{endOfDay.day}</h6>
                </div>
              </Top>
              {/* PAID */}
              <div>
                <table className="table table-striped caption-top">
                  <caption>Paid Invoices</caption>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>amount</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paid.map((item, i) => (
                      <tr key={i}>
                        <td>{item.id}</td>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>{item.total}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="my-5"></div>
              {/* UNPAID */}
              <div>
                <table className="table table-striped caption-top">
                  <caption>Unpaid Invoices</caption>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>amount</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unPaid.map((item, i) => (
                      <tr key={i}>
                        <td>{item.id}</td>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>{item.total}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        <div className="my-3 d-flex justify-content-end">
          <button onClick={() => printInvoice()}>Print</button>
        </div>
      </Wrapper>
    </>
  );
};

export default List;
