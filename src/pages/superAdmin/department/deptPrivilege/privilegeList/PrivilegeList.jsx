import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../../helpers/Alert";

// Styles
import { Wrapper } from "./PrivilegeList.Styles";

// components
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

const PrivilegeList = () => {
  const { loading, setLoading, savedDeptId, departments } =
    useContext(AppContext);

  const [privs, setPrivs] = useState([]);

  let SN = 0;

  const foundDept = departments[savedDeptId].department;

  // get privileges for found department
  const getPriv = async () => {
    try {
      // console.log("privs", privs);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/departments/privilleges?departmentId=${foundDept.id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("response", response);
      if (response.status === 200) {
        success("Fetched privileges");
        setPrivs(response.data.privileges);
      }
    } catch (err) {
      error("Couldn't fetch privileges");
      if (err.response.status === 401) {
        error(err.response.data.message);
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // delete privileges from department privileges
  const deleteHandler = async (id) => {
    try {
      // console.log("privs", privs);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/departments/privilleges/remove?privillegeId=${id}&departmentId=${foundDept.id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("response", response);
      if (response.status === 200) {
        success("Privilege Deleted");
        // setPrivs(response.data.privileges);
      }
    } catch (err) {
      error("Couldn't delete privilege");
      if (err.response.status === 401) {
        error(err.response.data.message);
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  useEffect(() => {
    getPriv();
  }, []);

  return (
    <>
      <Wrapper>
        <table className="table caption-top">
          <caption>
            All Users from <b>{foundDept.name} department</b> have access to the
            following product categories
          </caption>
          <tbody>
            {loading ? (
              <CircleSpinner />
            ) : (
              <>
                {privs.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{(SN = SN + 1)}</th>
                    <td>{item.name}</td>
                    <td>
                      <button onClick={() => deleteHandler(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default PrivilegeList;
