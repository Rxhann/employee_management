import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/app.css";
import "../styles/employeecreate.css";

const EmployeeCreate = () => {
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    img: null
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setEmployeeData((prevData) => {
      const newCourses = checked
        ? [...prevData.courses, value]
        : prevData.courses.filter((course) => course !== value);
      return { ...prevData, courses: newCourses };
    });
  };

  const handleGenderChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      gender: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      img: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!employeeData.name) formErrors.name = "Name is required";
    if (!employeeData.email) formErrors.email = "Email is required";
    if (!employeeData.mobile) formErrors.mobile = "Mobile is required";
    if (!employeeData.designation) formErrors.designation = "Designation is required";
    if (!employeeData.gender) formErrors.gender = "Gender is required";
    if (employeeData.courses.length === 0) formErrors.courses = "At least one course should be selected";
    if (!employeeData.img) formErrors.img = "Image upload is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", employeeData.name);
    formData.append("email", employeeData.email);
    formData.append("mobile", employeeData.mobile);
    formData.append("designation", employeeData.designation);
    formData.append("gender", employeeData.gender);
    formData.append("courses", employeeData.courses);
    formData.append("img", employeeData.img);

    axios
      .post("http://your-api-url.com/employee", formData) // Replace with your API URL
      .then(() => {
        setIsLoading(false);
        navigate("/employee-list");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error creating employee:", error);
      });
  };

  return (
    <div className="employee-create-container">
      {/* Button Group */}
      <div className="button-group">
        <button onClick={() => navigate("/dashboard")}>Home</button>
        <button onClick={() => navigate("/employee-create")}>Employee Create</button>
        <button onClick={() => navigate("/employee-list")}>Employee List</button>
        <button onClick={() => navigate("/employee-edit")}>Employee Edit</button>
        <button onClick={() => navigate("/logout")}>Logout</button>
      </div>

      {/* Form Content */}
      <h1>Employee Create</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={employeeData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={employeeData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            placeholder="Enter mobile number"
            value={employeeData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </div>

        <div className="form-field">
          <label>Select Designation</label>
          <select
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <p className="error">{errors.designation}</p>}
        </div>

        <div className="form-field">
          <label>Gender</label>
          <label>
            Male
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={employeeData.gender === "Male"}
              onChange={handleGenderChange}
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employeeData.gender === "Female"}
              onChange={handleGenderChange}
            />
          </label>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="form-field">
          <label>Courses</label>
          <label>
            MCA
            <input
              type="checkbox"
              value="MCA"
              checked={employeeData.courses.includes("MCA")}
              onChange={handleCourseChange}
            />
          </label>
          <label>
            BCA
            <input
              type="checkbox"
              value="BCA"
              checked={employeeData.courses.includes("BCA")}
              onChange={handleCourseChange}
            />
          </label>
          <label>
            BSC
            <input
              type="checkbox"
              value="BSC"
              checked={employeeData.courses.includes("BSC")}
              onChange={handleCourseChange}
            />
          </label>
          {errors.courses && <p className="error">{errors.courses}</p>}
        </div>

        <div className="form-field">
          <label>Image Upload</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
          {errors.img && <p className="error">{errors.img}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeCreate;
