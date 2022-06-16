import React from "react";

// Styles
import { Wrapper, Content } from "./Contact.Styles";

const Contact = () => {
  return (
    <>
      <Wrapper>
        <h5>Contact details</h5>
        <Content>
          <form>
            <div className="pair">
              <label>Name:</label>
              <input type="text" name="name" id="name" placeholder="Name" />
            </div>
            <div className="pair">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
              />
            </div>
            <div className="pair">
              <label>Email:</label>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="pair">
              <label>Telephone:</label>
              <input
                type="number"
                name="telephone"
                id="telephone"
                placeholder="Telephone"
              />
            </div>
            <button>Update</button>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default Contact;
