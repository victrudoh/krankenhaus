import { createContext, useState } from "react";
import axios from "axios";
import { success, error, info } from "../helpers/Alert";
import { useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [printing, setPrinting] = useState(false);

  // USERS
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({
    index: "",
    editing: false,
  });

  // to trigger reload of users list
  const [addedUser, setAddedUser] = useState("");
  const [editedUser, setEditedUser] = useState("");

  // DEPARTMENTS
  const [departments, setDepartments] = useState([]);
  const [editDeptId, setEditDeptId] = useState();
  // to trigger reload of department list
  const [addedDept, setAddedDept] = useState("");
  const [editedDept, SetEditedDept] = useState("");

  // PRODUCTS
  const [prodsByDept, setProdsByDept] = useState([]);

  // TRANSACTIONS
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Users Invoice stuff
  const [invoiceUser, setInvoiceUser] = useState({
    foundInvoiceUser: false,
    firstName: "",
    lastName: "",
    items: [],
  });
  const [savedInvoice, setSavedInvoice] = useState({
    display: false,
    data: {},
    items: [],
  });
  const [trackPayment, setTrackPayment] = useState({
    transaction: {},
    products: [],
  });
  const [transactionDisplayPage, setTransactionDisplayPage] =
    useState("products");
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const [invoiceCustomers, setInvoiceCustomers] = useState([]);
  const [endOfDay, setEndOfDay] = useState({
    day: "",
    transactions: [],
  });

  // **************** //
  //*** FUNCTIONS ***//
  // **************** //

  // Get active user
  const activeUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/users/${userId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log("~ activeUser ~ error", error);
    }
  };

  // Get All users
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://hospital-ms-api.herokuapp.com/users",
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("getUsers ~ response", response);
      setLoading(false);
      setUsers(response.data);
    } catch (err) {
      // console.log(err);
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // Edit user
  const editUserFunction = (user) => {
    setEditUser({
      index: user,
      editing: true,
      // editing: !editUserId.editing,
    });
  };

  // get All departments and units
  const getDepartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://hospital-ms-api.herokuapp.com/departments/all",
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("getDepartments ~ response", response);
      setDepartments(response.data);
      setLoading(false);
    } catch (err) {
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // fetch everything on startup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Fetch everything");
      activeUser();
      getUsers();
      getDepartments();
      setTransactions([]);
      // setPrinting(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        // Misc
        user,
        token,
        loading,
        printing,

        setUser,
        setToken,
        setLoading,
        setPrinting,

        // Users
        users,
        editUser,
        addedUser,
        editedUser,

        setUsers,
        getUsers,
        setEditUser,
        setAddedUser,
        setEditedUser,

        // Departments
        addedDept,
        editedDept,
        editDeptId,
        departments,

        setAddedDept,
        setEditDeptId,
        SetEditedDept,
        setDepartments,
        getDepartments,

        // Products
        prodsByDept,

        setProdsByDept,

        // Transactions
        chartData,
        transactions,

        setChartData,
        setTransactions,

        // Invoice stuff
        endOfDay,
        invoiceUser,
        savedInvoice,
        trackPayment,
        invoiceProducts,
        invoiceCustomers,
        transactionDisplayPage,

        setEndOfDay,
        setInvoiceUser,
        setTrackPayment,
        setSavedInvoice,
        setInvoiceProducts,
        setInvoiceCustomers,
        setTransactionDisplayPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
