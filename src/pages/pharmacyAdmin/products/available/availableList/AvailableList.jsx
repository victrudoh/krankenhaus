import React, { useContext, useState } from "react";

// styles
import { Wrapper, Top } from "./AvailableList.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";
import AppContext from "../../../../../context/AppContext";

const AvailableList = () => {
  const { loading, setLoading } = useContext(AppContext);

  setLoading(false);
  const [filtered, setFiltered] = useState([]);

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
