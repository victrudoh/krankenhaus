import { AppProvider } from "../src/context/AppContext";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

// Components
import SwitchLayout from "./SwitchLayout";
// import AuthLayout from "./components/appLayouts/AuthLayout";
// import Layout from "./components/layout/Layout";

function App() {
  console.log("App.js");
  // const token = localStorage.getItem("token");
  return (
    <div className="App">
      <AppProvider>
        <SwitchLayout />
        {/* <BrowserRouter>{!token ? <AuthLayout /> : <Layout />}</BrowserRouter>; */}
      </AppProvider>
    </div>
  );
}

export default App;
