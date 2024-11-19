import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";
import "../styles/employeelist.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming employees data would be fetched from the backend
    const employeeData = [
      { id: 1, name: "Hukum", email: "hcgupta@cstech.in", mobile: "954010044", designation: "HR", gender: "Male", course: "MCA", createDate: "13-Feb-21" },
      { id: 2, name: "Manish", email: "manish@cstech.in", mobile: "954010033", designation: "Sales", gender: "Male", course: "BCA", createDate: "12-Feb-21" },
      { id: 3, name: "Yash", email: "yash@cstech.in", mobile: "954010022", designation: "Manager", gender: "Male", course: "BSC", createDate: "11-Feb-21" },
      { id: 4, name: "Abhishek", email: "abhishek@cstech.in", mobile: "954010033", designation: "HR", gender: "Male", course: "MCA", createDate: "13-Feb-21" },
    ];
    setEmployees(employeeData);
  }, []);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleCreateEmployee = () => {
    navigate("/employee-create");
  };

  const handleEdit = (id) => {
    navigate(`/employee-edit/${id}`);
  };

  const handleDelete = (id) => {
    // Logic to delete employee, you can integrate with backend here
    alert(`Employee with ID: ${id} deleted`);
  };

  // Filter the employees based on the search keyword
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  return (
    <div className="employee-list-container">
      {/* Button Group */}
      <div className="button-group">
        <button onClick={() => navigate("/dashboard")}>Home</button>
        <button onClick={() => navigate("/employee-create")}>Employee Create</button>
        <button onClick={() => navigate("/employee-list")}>Employee List</button>
        <button onClick={() => navigate("/employee-edit")}>Employee Edit</button>
        <button onClick={() => { localStorage.removeItem("user"); navigate("/"); }}>Logout</button>
      </div>

      <h1>Employee List</h1>
      <div className="employee-search">
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </div>

      <div className="employee-info">
        <div className="total-count">Total Count: {filteredEmployees.length}</div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td><img src="#" alt="profile" style={{ width: 50, height: 50 }} /></td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{employee.createDate}</td>
                <td>
                  <button onClick={() => handleEdit(employee.id)}>Edit</button>
                  <button onClick={() => handleDelete(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
