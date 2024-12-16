const { UserRole } = require('../constant/UserRole')
const DateUtil = require('../util/DateUtil');
const Employee = require('../models/Employee');
const Schedule = require('../models/Schedule');
const asynceErrorHandler = require('../util/asyncErrorHandler');

class EmployeeController {
    all_get = asynceErrorHandler(async (req, res, next) => {
        const employees = await Employee.find().populate('user').exec();
        res.status(200).json(employees);
    });

    unScheduledEmployees_get = asynceErrorHandler(async (req, res, next) => {
        const schedules = await Schedule.find().exec();

        const scheduledEmployeeIds = schedules.map(schedule => schedule.employee.toString());
        const unScheduledEmployees = await Employee.find({
            _id: { $nin: scheduledEmployeeIds }
        }).populate('user').exec();
        return res.status(200).json(unScheduledEmployees);
    });

}

module.exports = new EmployeeController;