import { useContext, useEffect, useState } from "react";
import AppContext from "../../../../context/AppContext";
import axios from "axios";
import { success, error } from "../../../../helpers/Alert";

// styles
import { Content, Wrapper } from "./Overview.Styles";

// components
import Card from "./card/Card";

const Overview = () => {
  const { setLoading, users, departments, products } = useContext(AppContext);

  const [trxLength, setTrxLength] = useState("");

  const getTrxLength = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/transactions/length`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: Overview.jsx ~ line 28 ~ getTrxLength ~ response",
      //   response
      // );
      setLoading(false);
      if (response.status === 200) {
        setTrxLength(response.data.total);
      }
    } catch (err) {
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  useEffect(() => {
    getTrxLength();
  }, []);

  return (
    <>
      <Wrapper>
        <h6>Overview</h6>
        <Content>
          <Card
            name="users"
            icon="bx bxs-group"
            value={users.length}
            url="users"
          />
          <Card
            name="departments"
            icon="bx bxs-building"
            value={departments.length}
            url="department"
          />
          <Card
            name="products"
            icon="bx bx-box"
            value={products.length}
            url="products"
          />
          <Card
            name="transactions"
            icon="bx bxs-wallet-alt"
            value={trxLength}
            url="transactions"
          />
        </Content>
      </Wrapper>
    </>
  );
};

export default Overview;
