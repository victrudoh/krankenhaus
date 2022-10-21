import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../context/AppContext";
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

import { Wrapper, Top } from "./ExpiredProducts.Styles";

const ExpiredProducts = () => {
  const { loading, inventoryExpiredProducts } = useContext(AppContext);

  const [filtered, setFiltered] = useState([]);

  let SN = 1;

  // SearchBar Handler
  const onSearchCangeHandler = async (e) => {
    try {
      e.preventDefault();
      const filteredUser = inventoryExpiredProducts.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      setFiltered(filteredUser);
    } catch (err) {
      return err;
    }
  };

  // populate filtered with inventoryExpiredProducts on page load
  useEffect(() => {
    setFiltered(inventoryExpiredProducts);
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
                onChange={onSearchCangeHandler}
              />
              {/* <button type="submit">Search</button> */}
            </form>
          </div>
        </Top>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table table-striped text-center caption-top">
            <caption>List of Expired Products</caption>
            <>
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Brand</th>
                  {/* <th scope="col">Supplier</th> */}
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Sell Price(₦)</th>
                  <th scope="col">Expires (Y-M-D)</th>
                  {/* <th scope="col">Unit</th> */}
                </tr>
              </thead>
              {filtered.length > 0 ? (
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={i}>
                      <th scope="row">{SN++}</th>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      {/* <td>{item.supplier}</td> */}
                      <td>{item.quantity}</td>
                      {/* <td>{item.costPrice}</td> */}
                      <td>{item.measuringUnit}</td>
                      <td>{item.sellPrice.toLocaleString("en-US")}</td>
                      <td>{item.expiryDate.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Expired Product</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              )}
            </>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default ExpiredProducts;
