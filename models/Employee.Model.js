const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Department: {
    type: String,
    enum: ["Tech", "Marketing", "Operations"],
  },
  Salary: Number,
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports= {EmployeeModel}