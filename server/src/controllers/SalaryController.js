const Salary = require("../models/Salary");
const asyncErrorHandler = require("../util/asyncErrorHandler");
class SalaryController {
  all_get = asyncErrorHandler(async (req, res) => {
    const salary = await Salary.find().exec();
    res.status(200).json(salary);
  });
  get_by_employee = asyncErrorHandler(async (req, res) => {
    const { employee } = req.query;
    const salary = await Salary.findOne({ employee: employee });
    res.status(200).json(salary);
  });
  edit_put = asyncErrorHandler(async (req, res) => {
    const { employee, startDate, endDate, totalHours, totalSalary, isPaid } =
      req.body;
    const { id } = req.params;
    console.log(totalHours);
    const updatedSalary = await Salary.findByIdAndUpdate(id, {
      employee,
      startDate,
      endDate,
      totalHours,
      totalSalary,
      isPaid,
    });
    res.status(200).json({ message: "Update salary successfully" });
  });
}
module.exports = new SalaryController();
