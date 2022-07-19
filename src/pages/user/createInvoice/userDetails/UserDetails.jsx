import React, { useState, useContext } from "react";

// Styles
import { Wrapper, Content } from "./UserDetails.Styles";

// Components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";
import AppContext from "../../../../context/AppContext";

const UserDetails = () => {
  const { loading, setLoading, setInvoiceUser } = useContext(AppContext);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
  });

  const addInvoiceUser = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setInvoiceUser({
        foundInvoiceUser: true,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        items: [],
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onchangeHandler = (e) => {
    e.persist();
    setNewUser((item) => ({
      ...item,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Wrapper>
        <h5>New Customer</h5>
        <Content>
          {loading ? (
            <CircleSpinner />
          ) : (
            <form onSubmit={addInvoiceUser}>
              <div className="pair">
                <label>First name:</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  placeholder="First name"
                  onChange={onchangeHandler}
                  defaultValue={newUser.firstName}
                />
              </div>
              <div className="pair">
                <label>Last name:</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  placeholder="last name"
                  onChange={onchangeHandler}
                  defaultValue={newUser.lastName}
                />
              </div>
              <button type="submit">Proceed</button>
            </form>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default UserDetails;
