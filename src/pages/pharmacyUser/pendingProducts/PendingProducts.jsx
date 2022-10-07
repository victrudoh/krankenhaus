import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { success, error } from "../../../helpers/Alert";

// styles
import { Wrapper, Top } from "./PendingProducts.Styles";

// components
import { CircleSpinner } from "../../../components/circleSpinner/CircleSpinner.Styles";
import AppContext from "../../../context/AppContext";

const PendingProducts = () => {
  const {
    loading,
    setLoading,
    getPendingProducts,
    getAcceptedProducts,
    setEditInventoryProduct,
    inventoryPendingProducts,
  } = useContext(AppContext);

  const [filtered, setFiltered] = useState([]);

  let SN = 1;

  const acceptHandler = async (item) => {
    // console.log("Accept item", item);
    try {
      setLoading(true);
      const response = await axios.put(
        `https://hospital-ms-api.herokuapp.com/inventory/products/accept?product=${item.id}`,
        {},
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: PendingProducts.jsx ~ line 33 ~ acceptHandler ~ response",
      //   response
      // );
      setLoading(false);
      if (response.status === 200) {
        getPendingProducts();
        getAcceptedProducts();
        success(
          `Accepted ${item.quantity} ${item.measuringUnit} of ${item.name}`
        );
      }
    } catch (err) {
      error("Psych! Couldn't accept product");
      console.log(err);
      setLoading(false);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const rejectHandler = async (item) => {
    // console.log("reject item", item);
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://hospital-ms-api.herokuapp.com/inventory/products/reject?product=${item.id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: PendingProducts.jsx ~ line 78 ~ rejectHandler ~ response",
      //   response
      // );
      setLoading(false);
      if (response.status === 200) {
        getPendingProducts();
        getAcceptedProducts();
        error(
          `Rejected ${item.quantity} ${item.measuringUnit} of ${item.name}`
        );
      }
    } catch (err) {
      error("Psych! Couldn't reject product");
      console.log(err);
      setLoading(false);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
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
      const filteredUser = inventoryPendingProducts.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      setFiltered(filteredUser);
    } catch (err) {
      return err;
    }
  };

  // populate filtered with inventoryPendingProducts on page load
  useEffect(() => {
    setFiltered(inventoryPendingProducts);
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
          <table className="table table-striped text-center">
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
                  {/* <th scope="col">Unit</th> */}
                  <th scope="col">Actions</th>
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
                      {/* <td>{item.unit}</td> */}
                      <td>
                        <button onClick={() => acceptHandler(item)}>
                          Accept
                        </button>
                        <button onClick={() => rejectHandler(item)}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Pending Products</td>
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

export default PendingProducts;
