import React, { useContext, useState, useEffect } from "react";

// styles
import { Wrapper, Top, Bottom } from "./AvailableList.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";
import AppContext from "../../../../../context/AppContext";

const AvailableList = () => {
  const { loading, inventoryProds, setEditInventoryProduct } =
    useContext(AppContext);

  console.log(
    "🚀 ~ file: AvailableList.jsx ~ line 12 ~ AvailableList ~ inventoryProds",
    inventoryProds
  );

  const [filtered, setFiltered] = useState([]);

  let SN = 1;

  const editHandler = (item) => {
    setEditInventoryProduct({
      product: item,
      action: "edit",
    });
  };

  const viewHandler = (item) => {
    setEditInventoryProduct({
      product: item,
      action: "view",
    });
  };

  // SearchBar Handler
  const onSearchCangeHandler = async (e) => {
    try {
      e.preventDefault();
      const filteredProd = await inventoryProds.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      setFiltered(filteredProd);
    } catch (err) {
      console.log(
        "🚀 ~ file: AvailableList.jsx ~ line 46 ~ onSearchCangeHandler ~ err",
        err
      );
      // return err;
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
                onChange={onSearchCangeHandler}
              />
              {/* <button type="submit">Search</button> */}
            </form>
          </div>
        </Top>
        <Bottom>
          {loading ? (
            <CircleSpinner />
          ) : (
            <table className="table table-striped text-center caption-top">
              <caption>List of Available Products</caption>
              <>
                <thead>
                  <tr>
                    <th scope="col">S/N</th>
                    <th scope="col">Name</th>
                    <th scope="col">Brand</th>
                    {/* <th scope="col">Supplier</th> */}
                    <th scope="col">Quantity</th>
                    {/* <th scope="col">Cost Price</th> */}
                    <th scope="col">Sell Price</th>
                    {/* <th scope="col">Unit</th> */}
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={i}>
                      <th scope="row">{SN++}</th>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      {/* <td>{item.supplier}</td> */}
                      <td>{item.quantity}</td>
                      {/* <td>{item.costPrice}</td> */}
                      <td>{item.sellPrice}</td>
                      {/* <td>{item.unit}</td> */}
                      <td>
                        <button onClick={() => editHandler(item)}>Edit</button>
                        <button onClick={() => viewHandler(item)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            </table>
          )}
        </Bottom>
      </Wrapper>
    </>
  );
};

export default AvailableList;
