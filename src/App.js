import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

// Components";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
