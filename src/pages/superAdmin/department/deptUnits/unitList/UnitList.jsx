import React from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./UnitList.Styles";

const UnitList = ({ setIsEditing }) => {
  const navigate = useNavigate();
  const editHandler = () => {
    setIsEditing(true);
    // collect user ID and pass it to the edit page, use state to carry the ID or something
  };

  const viewHandler = () => {
    // collect ID and navigate torequired page
    navigate("/superadmin/viewunit");
  };
  return (
    <>
      <Wrapper>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Department</th>
              <th scope="col">Units</th>
              <th scope="col">Publish</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <>
              <tr className="bg-secondary bg-gradient text-white">
                <td className="fw-bold">A & E</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>1. A & E</td>
                <td>Yes</td>
                <td>
                  <button onClick={viewHandler}>View</button>
                  <button className="mx-3" onClick={editHandler}>
                    Edit
                  </button>
                </td>
              </tr>
            </>
            <>
              <tr className="bg-secondary bg-gradient text-white">
                <td className="fw-bold">Admin</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>2. Admin</td>
                <td>No</td>
                <td>
                  <button onClick={viewHandler}>View</button>
                  <button className="mx-3" onClick={editHandler}>
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>3. A&E Pharmacy</td>
                <td>Yes</td>
                <td>
                  <button onClick={viewHandler}>View</button>
                  <button className="mx-3" onClick={editHandler}>
                    Edit
                  </button>
                </td>
              </tr>
            </>
            <>
              <tr className="bg-secondary bg-gradient text-white">
                <td className="fw-bold">Amenity</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>4. Amenity</td>
                <td>Yes</td>
                <td>
                  <button onClick={viewHandler}>View</button>
                  <button className="mx-3" onClick={editHandler}>
                    Edit
                  </button>
                </td>
              </tr>
            </>
            <></>
          </tbody>

          {/* <>
            <tr>
              <td>A & E</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td className="d-flex flex-column">
                <td className="mb-3">1. A&E</td>
                <td>2. A&E</td>
              </td>
              <td className="d-flex flex-column">
                <td className="mb-3">Yes</td>
                <td>Yes</td>
              </td>
              <td className="d-flex flex-column">
                <td className="mb-3">
                  <button>View</button>
                  <button className="mx-3" onClick={editHandler}>
                    Edit
                  </button>
                </td>
                <td>
                  <button>View</button>
                  <button className="mx-3" onClick={editHandler}>
                    Edit
                  </button>
                </td>
              </td>
            </tr>
          </> */}
        </table>
      </Wrapper>
    </>
  );
};

export default UnitList;
