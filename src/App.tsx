import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import "./App.css";
import AGGRidTable from "./components/AGGridTable";
import ReactTableComponent from "./components/ReactTable/TableComponent";
import GlideDataGrid from "./components/GlideDataGrid";
import MUIDataGrid from "./components/MUIDataGrid";
import HomePage from "./components/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ag-grid" element={<AGGRidTable />} />
      <Route path="/react-table" element={<ReactTableComponent />} />
      <Route path="/glide-data-grid" element={<GlideDataGrid />} />
      <Route path="/mui-data-grid" element={<MUIDataGrid />} />
    </Routes>
  );
}

export default App;
