const User = require("../models/User");
const { UserRole } = require("../constant/UserRole");
const DateUtil = require("../util/DateUtil");
const Employee = require("../models/Employee");
const Schedule = require("../models/Schedule");
const asynceErrorHandler = require("../util/asyncErrorHandler");

class EmployeeController {
  all_get = asynceErrorHandler(async (req, res, next) => {
    const employees = await Employee.find().populate("user").exec();
    res.status(200).json(employees);
  });

  unScheduledEmployees_get = asynceErrorHandler(async (req, res, next) => {
    const schedules = await Schedule.find().exec();

    const scheduledEmployeeIds = schedules.map((schedule) =>
      schedule.employee.toString()
    );
    const unScheduledEmployees = await Employee.find({
      _id: { $nin: scheduledEmployeeIds },
    })
      .populate("user")
      .exec();
    return res.status(200).json(unScheduledEmployees);
  });

  get_by_id = async (req, res) => {
    const { id } = req.params;

    try {
      const employee = await Employee.findById(id).populate("user");
      res.status(200).json({ data: employee });
    } catch (error) {
      console.error("Error get employee by id: " + error);
      res.status(400).json({ message: "very fucking bad" });
    }
  };
  add_post = async (req, res) => {
    const { user, salaryPerHour, startWorkingDate } = req.body;
    try {
      const new_employee_2 = new Employee({
        user: user,
        salaryPerHour: salaryPerHour,
        startWorkingDate: startWorkingDate,
      });
      await new_employee_2.save();
      const updatedEmployeeUser = await User.findByIdAndUpdate(user, {
        role: "STAFF",
      });
      res.status(200).json({ message: "Add new employee successfully" });
    } catch (error) {
      console.error("Error add new employee: " + error);
      res.status(400).json({ message: "very fucking bad" });
    }
  };
  edit_put = async (req, res) => {
    const { id } = req.params;
    const { user_id, salaryPerHour, startWorkingDate } = req.body;
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        user: user_id,
        startWorkingDate,
        salaryPerHour,
      });
      res.status(200).json({
        message: "Update employee successfully",
        data: updatedEmployee,
      });
    } catch (error) {
      console.error("Error update employee: " + error);
      res.status(400).json({ message: "very fucking bad" });
    }
  };
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      await Employee.findByIdAndDelete(id);
      res.status(200).json({ message: "Remove employee successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message, code: error.code });
    }
  };
}
module.exports = new EmployeeController();
