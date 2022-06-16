import React from "react";

// Styles
import { Wrapper, Content } from "./AddProduct.Styles";

const AddProduct = () => {
  return (
    <>
      <Wrapper>
        <h5>Add Product/Service</h5>
        <Content>
          <form>
            <div className="pair">
              <label>Unit:</label>
              <select name="unit" id="unit">
                <option>Select unit</option>
                <option value="A&E">A&E</option>
                <option value="A&E_pharmacy">A&E pharmacy</option>
                <option value="bank">Bank</option>
                <option value="CSSD">CSSD</option>
                <option value="audit">Audit</option>
              </select>
            </div>
            <div className="pair">
              <label>Name:</label>
              <input type="text" name="name" id="name" placeholder="Name" />
            </div>
            <div className="pair">
              <label>Price:</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
              />
            </div>

            <div className="pair">
              <label>Add NHIS entry? (10% of regular price)</label>
              <select name="nhis" id="nhis">
                <option>Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="pair">
              <label>Publish?</label>
              <select name="nhis" id="nhis">
                <option>Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <button>Add Product/Service</button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default AddProduct;
