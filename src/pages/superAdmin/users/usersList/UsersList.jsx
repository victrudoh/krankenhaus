import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../../../../context/AppContext";

// styles
import { Wrapper, Top } from "./UsersList.Styles";

// components
import { CircleSpinner } from "../../../../components/circleSpinner/CircleSpinner.Styles";

const UsersList = () => {
  const [filtered, setFiltered] = useState([]);

  const { loading, users, setEditUser } = useContext(AppContext);

  let SN = 1;

  // Edit user
  const editHandler = (index) => {
    setEditUser({
      index: index,
      editing: true,
    });
  };

  // SearchBar Handler
  const onSearchCangeHandler = async (e) => {
    try {
      e.preventDefault();
      const filteredUser = users.filter((item) =>
        item.userName.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      setFiltered(filteredUser);
    } catch (err) {
      return err;
    }
  };

  // populate filtered with users on page load
  useEffect(() => {
    setFiltered(users);
  }, []);

  return (
    <>
      <Wrapper>
        <Top>
          <NavLink to="/superadmin/userlogs">User logs</NavLink>
          <div className="pair">
            <form>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search username"
                onChange={onSearchCangeHandler}
              />
              {/* <button type="submit">Search</button> */}
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
                  <th scope="col">Full name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Department</th>
                  <th scope="col">Account type</th>
                  <th scope="col">Rights</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
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
                ))}
              </tbody>
            </>
          </table>
        )}
      </Wrapper>
    </>
  );
};

export default UsersList;
