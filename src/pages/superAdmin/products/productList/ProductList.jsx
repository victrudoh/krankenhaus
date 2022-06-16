import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import { Wrapper, Top } from "./ProductList.Styles";

const ProductList = ({ setIsEditing }) => {
  const editHandler = () => {
    setIsEditing(true);
    // collect user ID and pass it to the edit page, use state to carry the ID or something
  };

  return (
    <>
      <Wrapper>
        <Top>
          <NavLink exact to="/superadmin/productsbyunits">
            View by units
          </NavLink>
          <div className="pair">
            <label>Select a department:</label>
            <form>
              <select name="publish" id="publish">
                <option value="all">All departments</option>
                <option value="contracts">Contracts and Tender</option>
                <option value="false">Dental services</option>
                <option value="false">FMC administration</option>
                <option value="false">Nursing services/Retainership</option>
              </select>
              <button type="submit">Sort</button>
            </form>
          </div>
        </Top>
        <table className="table table-hover">
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
            <tr onClick={editHandler}>
              <th scope="row">1</th>
              <td>A&E</td>
              <td>Amlodipine 10Mg</td>
              <td>17.00</td>
              <td>No</td>
            </tr>
            <tr onClick={editHandler}>
              <th scope="row">2</th>
              <td>A&E Pharmacy</td>
              <td>Amoxicillin INJ</td>
              <td>250.00</td>
              <td>Yes</td>
            </tr>
            <tr onClick={editHandler}>
              <th scope="row">3</th>
              <td>NHIS</td>
              <td>NHIS-Enoxaprim 20Mg</td>
              <td>85.00</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default ProductList;
