import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

const EndOfDay = () => {
  const { endOfDay } = useContext(AppContext);
  return (
    <>
      <div>EndOfDay</div>
      <div>
        <table className="table table-striped">
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>amount</th>
            <th>status</th>
          </thead>
          <tbody>
            {endOfDay.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.total}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EndOfDay;
