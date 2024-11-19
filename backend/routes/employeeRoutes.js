const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

// Create Employee
router.post('/create', async (req, res) => {
    // 1. Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.f_Email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // 2. Validate mobile (should be numeric and 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(req.body.f_Mobile)) {
        return res.status(400).json({ message: "Invalid mobile number. It should be a 10-digit number." });
    }

    // 3. Check if the email already exists
    const existingEmployee = await Employee.findOne({ f_Email: req.body.f_Email });
    if (existingEmployee) {
        return res.status(400).json({ message: "Email already exists" });
    }

    // 4. Validate image file type (only jpg, png)
    const imageRegex = /\.(jpg|jpeg|png)$/;
    if (!imageRegex.test(req.body.f_Image)) {
        return res.status(400).json({ message: "Only jpg, jpeg, or png images are allowed." });
    }

    // 5. Create a new employee if all validations pass
    const newEmployee = new Employee({
        f_Id: req.body.f_Id,
        f_Image: req.body.f_Image,
        f_Name: req.body.f_Name,
        f_Email: req.body.f_Email,
        f_Mobile: req.body.f_Mobile,
        f_Designation: req.body.f_Designation,
        f_gender: req.body.f_gender,
        f_Course: req.body.f_Course,
        f_Createdate: req.body.f_Createdate,
    });

    try {
        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error creating employee", error });
    }
});

// Get All Employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});

// Update Employee
router.put('/:id', async (req, res) => {
    try {
        // Convert the string ID to ObjectId
        const employeeId = req.params.id;
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
});
// Delete Employee
router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});

module.exports = router;
