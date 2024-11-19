import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/app.css";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="button-group">
        <button onClick={() => navigate("/dashboard")}>Home</button>
        <button onClick={() => navigate("/employee-create")}>Employee Create</button>
        <button onClick={() => navigate("/employee-list")}>Employee List</button>
        <button onClick={() => navigate("/employee-edit")}>Employee Edit</button>
        <button onClick={() => navigate("/logout")}>Logout</button>
      </div>
      <h1>Dashboard</h1>
      <h2>Welcome Admin panel</h2>
      {/* Additional content for the dashboard */}
    </div>
  );
};

export default Dashboard;
