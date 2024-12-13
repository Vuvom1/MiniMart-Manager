const {UserRole} = require('../constant/UserRole')
const DateUtil = require('../util/DateUtil');
const Employee = require('../models/Employee');

class EmployeeController {
    all_get = async (req, res) => {
        try {
            const employees = await Employee.find()
            .populate('user')
            .exec();

            res.status(200).json(employees);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new EmployeeController;