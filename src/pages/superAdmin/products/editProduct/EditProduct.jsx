import React from "react";

// Styles
import { Wrapper, Content } from "./EditProduct.Styles";

const EditProduct = ({ setIsEditing }) => {
  return (
    <>
      <Wrapper>
        <h5>Edit Product/Service</h5>
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

            {/* <div className="pair">
              <label>Add NHIS entry?</label>
              <p>10% of regular price</p>
              <select name="nhis" id="nhis">
                <option>Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div> */}
            <div className="pair">
              <label>Publish?</label>
              <select name="nhis" id="nhis">
                <option>Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <button>Update Product/Service</button>
            <button className="mx-3" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default EditProduct;
