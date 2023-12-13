const { Router } = require("express");

const { EmployeeModel } = require("../models/Employee.Model");

const employeeRouter = Router();

employeeRouter.get("/", async (req, res) => {
  // res.json({message: "Hello from Employee route!"})
  const results = await EmployeeModel.find();
  res.json({ Employee: results });
});

employeeRouter.post("/add", async (req, res) => {
  try {
    const { FirstName, LastName, Email, Department, Salary } = req.body;

    const new_Employee = await EmployeeModel.create({
      FirstName,
      LastName,
      Email,
      Department,
      Salary,
    });

    res.json({ message: "New Employee Added", Employee: new_Employee });
  } catch (error) {
    console.log("Error while add the employee details: ", error);
  }
});





module.exports = { employeeRouter };
