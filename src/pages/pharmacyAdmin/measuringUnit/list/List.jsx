import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../context/AppContext";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

// Styles
import { Wrapper, Top } from "./List.Styles";

const List = () => {
  const [filtered, setFiltered] = useState([]);

  const { loading, inventoryMeasuringUnit, setEditMeasuringUnit } =
    useContext(AppContext);

  console.log("inventoryMeasuringUnit", inventoryMeasuringUnit);

  let SN = 1;

  // Edit user
  const editHandler = (item) => {
    setEditMeasuringUnit({
      unit: item,
      editing: true,
    });
  };

  // SearchBar Handler
  const onSearchCangeHandler = async (e) => {
    try {
      e.preventDefault();
      const filteredUser = inventoryMeasuringUnit.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      setFiltered(filteredUser);
    } catch (err) {
      return err;
    }
  };

  // populate filtered with users on page load
  useEffect(() => {
    setFiltered(inventoryMeasuringUnit);
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
                placeholder="Search name"
                onChange={onSearchCangeHandler}
              />
              {/* <button type="submit">Search</button> */}
            </form>
          </div>
        </Top>
        {loading ? (
          <CircleSpinner />
        ) : (
          <table className="table table-hover text-center">
            <>
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr key={i} onClick={() => editHandler(item)}>
                    <th scope="row">{SN++}</th>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default List;
