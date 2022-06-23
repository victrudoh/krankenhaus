import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Styles
import { Wrapper, Top, Head } from "./ViewUnit.Styles";

const ViewUnit = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/superadmin/deptunits");
  };

  return (
    <>
      <Wrapper>
        <Head>
          <h4 className="mx-e">Products/Services by Units</h4>
          <i class="bx bx-x-circle" onClick={goBack}></i>
        </Head>
        <hr />
        <Top>
          {/* <NavLink exact to="/superadmin/userlogs">
            User logs
          </NavLink> */}
          <div className="pair">
            <form>
              <label className="mx-3">Select a unit:</label>
              <select name="unit" id="unit">
                <option>Select Unit</option>
                <option value="bank-admin">Bank admin</option>
                <option value="hospital-admin">Hospital admin</option>
                <option value="teller">Teller</option>
                <option value="pharmacy">Pharmacist</option>
              </select>
              <button type="submit">Sort</button>
            </form>
          </div>
        </Top>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Department</th>
              <th scope="col">Product/Service</th>
              <th scope="col">Price</th>
              <th scope="col">Publish</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>A&E</td>
              <td>Back slaps</td>
              <td>4000.00</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Admin</td>
              <td>Chest Tube-Insertion</td>
              <td>7000.00</td>
              <td>No</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>A&E</td>
              <td>Back slaps</td>
              <td>4000.00</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Admin</td>
              <td>Chest Tube-Insertion</td>
              <td>7000.00</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default ViewUnit;
