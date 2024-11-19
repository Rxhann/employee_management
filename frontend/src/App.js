import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeCreate from "./pages/EmployeeCreate";
import EmployeeList from "./pages/EmployeeList";
import EmployeeEdit from "./pages/EmployeeEdit";
import "./styles/app.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-create" element={<EmployeeCreate />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/employee-edit" element={<EmployeeEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
