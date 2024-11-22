const mongoose = require("mongoose");
const Staff = require("../models/Staff");
class EmployeeController {
  all_get = async (req, res) => {
    try {
      const employees = Staff.find();
      res.status(200).json(employees);
    } catch (error) {
      console.error(error);
    }
  };
}
