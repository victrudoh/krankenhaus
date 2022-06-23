import React from "react";
import { useNavigate } from "react-router-dom";

// Styles
import { Wrapper, Top, Head } from "./ViewDetails.Styles";

const ViewDetails = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/superadmin/transactions");
  };

  return (
    <>
      <Wrapper>
        <Head>
          <h4>Transaction detail: Username</h4>
          <i class="bx bx-x-circle" onClick={goBack}></i>
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
