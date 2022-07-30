import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../../helpers/Alert";

// styles
import { Wrapper, Top } from "./List.Styles";

// components
import { CircleSpinner } from "../../../../../../components/circleSpinner/CircleSpinner.Styles";

const List = ({ setIsCustomer }) => {
  const {
    loading,
    setLoading,
    transactions,
    setSavedInvoice,
    setShowProductPage,
  } = useContext(AppContext);

  let SN = 0;
  let totalPrice = 0;

  const getDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/transactions/${id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      // console.log("response", response);
      if (response.status === 200) {
        success("Found payment");
        // show transaction details on screen
        setSavedInvoice({
          display: true,
          data: response.data.transaction,
          items: response.data.products,
        });
      }
    } catch (err) {
      error("Couldn't fetch details");
      // console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <Top>
          {/* <button onClick={() => setShowProductPage(true)}> */}
          <button onClick={() => setIsCustomer(false)}>
            View Product Transaction History
          </button>
          {/* <div className="pair">
            <form>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search record"
              />
              <button type="submit">Search</button>
            </form>
          </div> */}
        </Top>
        <table className="table table-striped caption-top">
          <caption>Transaction History: Customers</caption>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Payment date</th>
              <th scope="col">Name</th>
              <th scope="col">Teller</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <CircleSpinner />
            ) : (
              <>
                {transactions.map((item, i) => (
                  <tr>
                    <th scope="row">{(SN = SN + 1)}</th>
                    <td>{item.date}</td>
                    <td>
                      {item.firstName} {item.lastName}
                    </td>
                    <td>Bank Bank</td>
                    <td value={(totalPrice = totalPrice + item.total)}>
                      {item.total}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      {/* <a href="#">Details</a> */}
                      <button onClick={() => getDetails(item.id)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        <div className="bottom">
          <div className="moveToRight">
            <div className="row">
              <h5>Total</h5>
            </div>
            <div className="row">
              <h5>₦ {totalPrice}</h5>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default List;
