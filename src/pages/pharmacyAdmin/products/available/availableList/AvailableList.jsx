import React, { useContext, useState, useEffect } from "react";

// styles
import { Wrapper, Top } from "./AvailableList.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";
import AppContext from "../../../../../context/AppContext";

const AvailableList = () => {
  const { loading, setLoading, inventoryProds } = useContext(AppContext);

  const [filtered, setFiltered] = useState([]);

  let SN = 1;

  // SearchBar Handler
  const onSearchCangeHandler = async (e) => {
    try {
      e.preventDefault();
      const filteredUser = inventoryProds.filter((item) =>
        item.userName.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      setFiltered(filteredUser);
    } catch (err) {
      return err;
    }
  };

  // populate filtered with inventoryProds on page load
  useEffect(() => {
    setFiltered(inventoryProds);
  }, []);

  return (
    <>
      <Wrapper>
        <Top>
          <div></div>
          <div className="pair">
            <form>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search Product Name"
                // onChange={onSearchCangeHandler}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </Top>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table table-hover">
            <>
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Supplier</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Cost Price</th>
                  <th scope="col">Sell Price</th>
                  <th scope="col">Unit</th>
                </tr>
              </thead>
              <tbody>
                {/* {filtered.map((item, i) => (
                  <tr key={i} onClick={() => editHandler(i)}>
                    <th scope="row">{SN++}</th>
                    <td>
                      {item.firstName} {item.lastName}
                    </td>
                    <td>{item.userName}</td>
                    <td>{item.department}</td>
                    <td>{item.role}</td>
                    <td>{item.access}</td>
                  </tr>
                ))} */}
              </tbody>
            </>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default AvailableList;
