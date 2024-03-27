const mongoose = require("mongoose");

const AddEmployee = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    email: { type: String, required: true },
    salary: { type: Number, required: true },
    classification: { type: String },
    gender: { type: String, required: true },
    birthdate: { type: Date, required: true },
  },
  { collection: "AddEmployeeData" }
);

const AddEmployeeModel = mongoose.model("AddEmployeeData", AddEmployee);

module.exports = AddEmployeeModel;
