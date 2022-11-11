import { createContext, useState } from "react";
import axios from "axios";
import { error } from "../helpers/Alert";
import { useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [leftPanelLoading, setLeftPanelLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [printing, setPrinting] = useState(false);
  const [topbarName, setTopbarName] = useState("Welcome!");

  // USERS
  const [users, setUsers] = useState([]);
  const [usersByDept, setUsersByDept] = useState([]);
  const [userLogs, setUserLogs] = useState([]);
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
  const [editUnit, setEditUnit] = useState({
    isEditingUnit: false,
    unitId: "",
    deptName: "",
  });
  const [savedDeptId, setSavedDeptId] = useState(); //for privileges
  const [savedDeptName, setSavedDeptName] = useState(); //for department unit products/services
  // to trigger reload of department list
  const [addedDept, setAddedDept] = useState("");
  const [editedDept, SetEditedDept] = useState("");

  // PRODUCTS
  const [products, setProducts] = useState([]);
  const [prodsByDept, setProdsByDept] = useState([]);
  const [prodsByUnit, setProdsByUnit] = useState([]);
  const [prodsByPriv, setProdsByPriv] = useState([]);
  const [displayByUnit, setDisplayByUnit] = useState(false); //for view product by unit
  const [editProduct, setEditProduct] = useState({
    index: "",
    editing: false,
  });

  // TRANSACTIONS
  const [transactions, setTransactions] = useState([]);
  const [trxLength, setTrxLength] = useState(""); //for dashboard
  const [transactionsByProds, setTransactionsByProds] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showProductPage, setShowProductPage] = useState(false);
  const [displayCustomer, setDisplayCustomer] = useState(false);
  const [deptSummary, setDeptSummary] = useState([]);
  const [unitSummary, setUnitSummary] = useState([]);
  const [trxDisplay, setTrxDisplay] = useState("");
  const [byUnit, setByUnit] = useState(false); //for display
  const [getDetails, setGetDetails] = useState({
    display: false,
    data: {},
    items: [],
  });

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

  //*******/
  //************/
  // INVENTORY STUFF (Pharmacy admin)
  //************/
  //*******/
  const [pharmProdDisplay, setPharmProdDisplay] = useState("available");
  const [inventoryProds, setInventoryProds] = useState([]);
  const [inventorySuppliers, setInventorySuppliers] = useState([]);
  const [inventoryMeasuringUnit, setInventoryMeasuringUnit] = useState([]);
  const [deptForInventory, setDeptForInventory] = useState([]);
  const [pharmacyUnits, setPharmacyUnits] = useState([]);
  const [inventoryPendingProducts, setInventoryPendingProducts] = useState([]);
  const [inventoryAcceptedProducts, setInventoryAcceptedProducts] = useState(
    []
  );
  const [inventoryExpiredProducts, setInventoryExpiredProducts] = useState([]);
  const [inventoryOutOfStockProducts, setInventoryOutOfStockProducts] =
    useState([]);
  const [editInventoryProduct, setEditInventoryProduct] = useState({
    product: {},
    action: "", //edit, view, "" for none
  });
  const [editSupplier, setEditSupplier] = useState({
    index: "",
    editing: false,
  });
  const [editMeasuringUnit, setEditMeasuringUnit] = useState({
    unit: {},
    editing: false,
  });
  const [editInventoryUnit, setEditInventoryUnit] = useState({
    action: "add",
    unit: {},
    deptName: "",
  });

  //************/
  //*******/

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
        "https://hospital-ms-api.herokuapp.com/users?page=0&size=15",
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("getUsers ~ response", response);
      setLoading(false);
      setUsers(response.data);
    } catch (err) {
      // console.log(err);
      error(err.response.data.message);
      if (err.response.status === 401) {
        // error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // Get Users Under Current User's Department
  const getUsersByDept = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://hospital-ms-api.herokuapp.com/users/department?page=0&limit=100",
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: AppContext.js ~ line 185 ~ getUsersByDept ~ response",
      //   response
      // );
      setLoading(false);
      setUsersByDept(response.data.users);
    } catch (err) {
      // console.log(err);
      // error(err.response.data.message);
      if (err.response.status === 401) {
        // error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // Get User logs
  const getUserLogs = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/auth/logs?From=2022-05-11&To=2022-10-10&page=0&size=20`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(
        "🚀 ~ file: AppContext.js ~ line 219 ~ getUserLogs ~ response",
        response
      );
      setLoading(false);
      if (response.status === 200) {
        setUserLogs(response.data.logs);
      }
    } catch (err) {
      // error("Couldn't fetch logs");
      console.log(err);
      setLoading(false);
      if (err.response.status === 401) {
        // error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // Edit user
  // const editUserFunction = (user) => {
  //   setEditUser({
  //     index: user,
  //     editing: true,
  //     // editing: !editUserId.editing,
  //   });
  // };

  // get All products
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/products`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      // console.log(
      //   "🚀 ~ file: AppContext.js ~ line 152 ~ getProducts ~ response",
      //   response
      // );
      if (response.status === 200) {
        setProducts(response.data.products);
        setProdsByDept(response.data.products);
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

  // get All products
  const getProductsByPriv = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/products/search`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: AppContext.js ~ line 301 ~ getProductsByPriv ~ response",
      //   response
      // );
      setLoading(false);
      if (response.status === 200) {
        setProdsByPriv(response.data.products);
      }
    } catch (err) {
      console.log(
        "🚀 ~ file: AppContext.js ~ line 310 ~ getProductsByPriv ~ err",
        err
      );
      // error(err.response.data.message);
      // if (err.response.status === 401) {
      //   error("Unauthorized");
      //   localStorage.removeItem("token");
      //   window.location.reload(false);
      // }
    }
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
      // console.log("getDepartments ~ response", response);
      setDepartments(response.data);
      setLoading(false);
    } catch (err) {
      console.log(
        "🚀 ~ file: AppContext.js ~ line 367 ~ getDepartments ~ err",
        err
      );
      // error(err.response.data.message);
      if (err.response.status === 401) {
        // error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // Get Transaction length
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

  // Get Transaction Chart
  const getTrxChart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/transactions/monthly`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: AppContext.js ~ line 350 ~ getTrxChart ~ response",
      //   response
      // );
      setLoading(false);
      if (response.status === 200) {
        setChartData(response.data.chart);
      }
    } catch (err) {
      error(err.response.data.message);
      setLoading(false);
      // if (err.response.status === 401) {
      //   error("Unauthorized");
      //   localStorage.removeItem("token");
      //   window.location.reload(false);
      // }
    }
  };

  //*******/
  //************/
  // INVENTORY STUFF (Pharmacy admin)
  //************/
  //*******/

  // get All products
  const getInventoryProducts = async () => {
    // getInventorySuppliers();
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/inventory/products/all?size=20&page=0`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("getInventoryProducts ~ response", response);
      setLoading(false);
      if (response.status === 200) {
        setInventoryProds(response.data);
      }
    } catch (err) {
      setLoading(false);
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const getInventorySuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/inventory/suppliers/all?page=0&size=15`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      // console.log("getSuppliers ~ response", response);
      if (response.status === 200) {
        setInventorySuppliers(response.data);
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

  const getPharmacyUnits = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/departments/units?name=Pharmacy`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      // console.log("getPharmacyUnits ~ response", response);
      if (response.status === 200) {
        setPharmacyUnits(response.data.units);
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

  const getInventoryDept = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/departments/`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      // console.log(
      //   "🚀 ~ file: AddUnit.jsx ~ line 36 ~ getDept ~ response",
      //   response
      // );

      if (response.status === 200) {
        setDeptForInventory(response.data.departments);
      }
    } catch (err) {
      setLoading(false);
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const getInventoryMeasuringUnit = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/inventory/measuring-unit/all`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: AppContext.js ~ line 396 ~ getInventoryMeasuringUnit ~ response",
      //   response
      // );
      setLoading(false);

      if (response.status === 200) {
        setInventoryMeasuringUnit(response.data.measuringUnits);
      }
    } catch (err) {
      setLoading(false);
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // get pending products
  const getPendingProducts = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/inventory/products/pending`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: AppContext.js ~ line 433 ~ getPendingProducts ~ response",
      //   response
      // );
      setLoading(false);

      if (response.status === 200) {
        setInventoryPendingProducts(response.data.products);
      }
    } catch (err) {
      setLoading(false);
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // get Accepted products
  const getAcceptedProducts = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/inventory/products/accepted`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: AppContext.js ~ line 499 ~ getAcceptedProducts ~ response",
      //   response
      // );
      setLoading(false);
      if (response.status === 200) {
        setInventoryAcceptedProducts(response.data.products);
      }
    } catch (err) {
      setLoading(false);
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // get Expired products
  const getExpiredProducts = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/inventory/products/expired`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: AppContext.js ~ line 663 ~ getExpiredProducts ~ response",
      //   response
      // );
      setLoading(false);
      if (response.status === 200) {
        setInventoryExpiredProducts(response.data.products);
      }
    } catch (err) {
      setLoading(false);
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  // get Out of Stock products
  const getOutOfStockProducts = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.herokuapp.com/inventory/products/finished`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: AppContext.js ~ line 697 ~ getOutOfStockProducts ~ response",
      //   response
      // );
      setLoading(false);
      if (response.status === 200) {
        setInventoryOutOfStockProducts(response.data.products);
      }
    } catch (err) {
      setLoading(false);
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  //*******/
  //************/
  // fetch everything on startup
  //************/
  //*******/

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Fetch everything");
      getUsers();
      activeUser();
      getUserLogs();
      getProducts();
      getTrxChart();
      getTrxLength();
      getUsersByDept();
      getProductsByPriv();
      setTransactions([]);

      // INVENTORY STUFF
      getInventoryDept();
      getPharmacyUnits();
      getPendingProducts();
      getExpiredProducts();
      getAcceptedProducts();
      getInventoryProducts();
      getInventorySuppliers();
      getOutOfStockProducts();
      getInventoryMeasuringUnit();
    }
  }, []);

  useEffect(() => {
    if (user.role === "super-admin") {
      getDepartments();
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        // Misc
        user,
        token,
        loading,
        printing,
        topbarName,
        leftPanelLoading,

        setUser,
        setToken,
        setLoading,
        setPrinting,
        setTopbarName,
        setLeftPanelLoading,

        // Users
        users,
        editUser,
        userLogs,
        addedUser,
        editedUser,
        usersByDept,

        setUsers,
        getUsers,
        setUserLogs,
        setEditUser,
        setAddedUser,
        setEditedUser,
        setUsersByDept,

        // Departments
        addedDept,
        editDeptId,
        editUnit,
        editedDept,
        departments,
        savedDeptId,
        savedDeptName,

        setAddedDept,
        setEditDeptId,
        setEditUnit,
        SetEditedDept,
        setDepartments,
        getDepartments,
        setSavedDeptId,
        setSavedDeptName,

        // Products
        products,
        editProduct,
        prodsByDept,
        prodsByUnit,
        prodsByPriv,
        displayByUnit,

        setProducts,
        setEditProduct,
        setProdsByUnit,
        setProdsByDept,
        setProdsByPriv,
        setDisplayByUnit,

        // Transactions
        byUnit,
        trxLength,
        chartData,
        trxDisplay,
        getDetails,
        deptSummary,
        unitSummary,
        transactions,
        showProductPage,
        displayCustomer,
        transactionsByProds,

        setByUnit,
        setChartData,
        setTrxDisplay,
        setGetDetails,
        setDeptSummary,
        setUnitSummary,
        setTransactions,
        setDisplayCustomer,
        setShowProductPage,
        setTransactionsByProds,

        // Invoice stuff
        endOfDay,
        invoiceUser,
        savedInvoice,
        trackPayment,
        invoiceProducts,
        invoiceCustomers,
        // savedProductInvoice,
        // savedCustomerInvoice,
        transactionDisplayPage,

        setEndOfDay,
        setInvoiceUser,
        setTrackPayment,
        setSavedInvoice,
        setInvoiceProducts,
        setInvoiceCustomers,
        // setSavedProductInvoice,
        // setSavedCustomerInvoice,
        setTransactionDisplayPage,

        // INVENTORY (Pharmacy Admin)
        editSupplier,
        pharmacyUnits,
        inventoryProds,
        pharmProdDisplay,
        deptForInventory,
        editMeasuringUnit,
        editInventoryUnit,
        inventorySuppliers,
        editInventoryProduct,
        inventoryMeasuringUnit,
        inventoryPendingProducts,
        inventoryExpiredProducts,
        inventoryAcceptedProducts,
        inventoryOutOfStockProducts,

        setEditSupplier,
        setPharmacyUnits,
        getPharmacyUnits,
        setInventoryProds,
        getPendingProducts,
        getAcceptedProducts,
        setPharmProdDisplay,
        setDeptForInventory,
        setEditInventoryUnit,
        setEditMeasuringUnit,
        getInventoryProducts,
        setInventorySuppliers,
        getInventorySuppliers,
        setEditInventoryProduct,
        getInventoryMeasuringUnit,
        setInventoryMeasuringUnit,
        setInventoryPendingProducts,
        setInventoryExpiredProducts,
        setInventoryAcceptedProducts,
        setInventoryOutOfStockProducts,

        // ***RELOAD STATES*** //
        // Pharmacy Admin
        // addUserReloadPA,

        // setAddUserReloadPA,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
