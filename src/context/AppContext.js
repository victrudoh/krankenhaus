import { createContext, useState } from "react";
import axios from "axios";
import { error } from "../helpers/Alert";
import { useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [printing, setPrinting] = useState(false);
  const [topbarName, setTopbarName] = useState("");

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
  const [trxDisplay, setTrxDisplay] = useState("records");
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
    isEditingUnit: false,
    unit: {},
    deptName: "",
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
        error("Unauthorized");
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
      error(err.response.data.message);
      if (err.response.status === 401) {
        error("Unauthorized");
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
        `https://hospital-ms-api.herokuapp.com/inventory/products/all?size=2&page=0`,
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
      console.log("getPharmacyUnits ~ response", response);
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
      getProducts();
      getTrxLength();
      setTransactions([]);

      // INVENTORY STUFF
      getInventoryDept();
      getPharmacyUnits();
      getInventoryProducts();
      getInventorySuppliers();
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

        setUser,
        setToken,
        setLoading,
        setPrinting,
        setTopbarName,

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
        prodsByDept,
        prodsByUnit,
        editProduct,
        displayByUnit,

        setProducts,
        setEditProduct,
        setProdsByUnit,
        setProdsByDept,
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

        setEditSupplier,
        setPharmacyUnits,
        getPharmacyUnits,
        setInventoryProds,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
