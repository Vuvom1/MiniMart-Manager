const errors = require('../constant/errors');
const Schedule = require('../models/Schedule')
const {DaysOfWeek} = require('../constant/DayOfWeek')
const Shift = require('../models/Shift')
const Employee = require('../models/Employee');
const User = require('../models/User');
const asynceErrorHandler = require('../util/asyncErrorHandler');
const DateUtil = require('../util/DateUtil');

class ScheduleController {

    all_get = asynceErrorHandler(async (req, res) => {
        try {
            const schedules = await Schedule.find()
                .populate('employee')
                .populate({
                    path: 'employee',
                    populate: { path: 'user' }
                })
                .populate({
                    path: 'scheduleDetails.shift',
                    populate: { path: 'style' }
                })
                .exec();

            res.status(200).json(schedules);
        } catch (error) {
            throw error
        }
    }); 

    allWithShiftAndSalary_get = asynceErrorHandler(async (req, res) => {
       
            const schedules = await Schedule.aggregate([
                {
                    $lookup: {
                        from: 'shifts', 
                        localField: '_id',
                        foreignField: 'schedule',
                        as: 'shifts',
                    },
                },
                {
                    $lookup: {
                        from: 'employees', 
                        localField: 'employee',
                        foreignField: '_id',
                        as: 'employee',
                    },
                },
                {
                    $unwind: { path: '$employee', preserveNullAndEmptyArrays: true },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'employee.user',
                        foreignField: '_id',
                        as: 'employee.user',
                    },
                },
                {
                    $unwind: { path: '$employee.user', preserveNullAndEmptyArrays: true },
                },
                {
                    $lookup: {
                        from: 'salaries',
                        localField: 'employee._id',
                        foreignField: 'employee',
                        as: 'employee.salary',
                    },
                },
                {
                    $unwind: { path: '$employee.salary', preserveNullAndEmptyArrays: true },
                },
                {
                    $unwind: { path: '$shifts', preserveNullAndEmptyArrays: true },
                },
                {
                    $lookup: {
                        from: 'positions', 
                        localField: 'shifts.position', 
                        foreignField: '_id', 
                        as: 'shifts.position',
                    },
                },
                {
                    $unwind: { path: '$shifts.position', preserveNullAndEmptyArrays: true },
                },
                {
                    $group: {
                        _id: '$_id', 
                        schedule: { $first: '$$ROOT' }, 
                        shifts: { $push: '$shifts' }, 
                    },
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: ['$schedule', { shifts: '$shifts' }] } },
                },
            ]);
    
            res.status(200).json(schedules);
    });

    add_post = asynceErrorHandler(async (req, res, next) => {
            const { employeeId } = req.body;

            const existingEmployee = await Employee.findById(employeeId);
            if (!existingEmployee) {
                const error = new Error(errors.employeeNotFound.code);
                next(error);
            }

            const existingSchedule = await Schedule.findOne({ employee: employeeId });

            if (existingSchedule) {
                const error = new Error(errors.alreadyExistSchedule.code);
                next(error);
            }

            const schedule = new Schedule({ employee: employeeId });
            schedule.save();
            res.status(201).json("New employee has been added to schedule");
    });

    edit_put = async (req, res) => {

    }


    // edit_put = async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const { name, email, status, phone, address, description } = req.body.supplierData;

    //         const supplier = await Supplier.findById(id);
    //         if (!supplier) {
    //             return res.status(404).json({ message: 'Supplier not found' });
    //         }

    //         const existingName = await Supplier.findOne({ name, _id: { $ne: id } });
    //         const existingEmail = await Supplier.findOne({ email, _id: { $ne: id } });

    //         if (existingEmail) {
    //             const error = new Error(errors.alreadyExistEmail.message);
    //             error.code = 'alreadyExistEmail';
    //             throw error;
    //         }

    //         if (existingName) {
    //             const error = new Error(errors.alreadyExistName.message);
    //             error.code = 'alreadyExistName';
    //             throw error;
    //         }

    //         supplier.name = name;
    //         supplier.email = email;
    //         supplier.status = status;
    //         supplier.phone = phone;
    //         supplier.address = address;
    //         supplier.description = description;

    //         await supplier.save();
    //         res.status(200).json('Supplier updated successfully');
    //     } catch (error) {
    //         res.status(400).json({ message: error.message, code: error.code });
    //     }

    //     all_get = async (req, res) => {
    //         try {
    //             const suppliers = await Supplier.find();

    //             res.status(200).json(suppliers);
    //         } catch (error) {
    //             throw error
    //         }
    //     }
    // };

    // statistic_get = async (req, res) => {
    //     try {

    //         const totalSuppliers = await Supplier.countDocuments();

    //         const statisticByDate = await this.statisticByDate();

    //         const statisticByMonth = await this.statisticByMonth();

    //         const statisticByYear = await this.statisticByYear();

    //         res.status(200).json({
    //             totalSuppliers,
    //             statisticByDate,
    //             statisticByMonth,
    //             statisticByYear,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "An error occurred while counting suppliers.", error: error.message });
    //     }
    // };

    // statisticByDate = async () => {
    //     try {
    //         const todaySuppliers = await Supplier.countDocuments({
    //             createdAt: { $gte: DateUtil.getStartOfToday(), $lt: DateUtil.getEndOfToday()}
    //         });

    //         const yesterdaySuppliers = await Supplier.countDocuments({
    //             createdAt: { $gte: DateUtil.getStartOfYesterday(), $lt: DateUtil.getEndOfYesterday() }
    //         });

    //         const comparison = yesterdaySuppliers === 0 ? todaySuppliers : (todaySuppliers / yesterdaySuppliers);
    //         const percentageCompareYesterday = comparison * 100;

    //         return {
    //             todaySuppliers,
    //             yesterdaySuppliers,
    //             comparison,
    //             percentageCompareYesterday,
    //         };
    //     } catch (error) {
    //         console.error('Error fetching daily statistics:', error);
    //     }
    // };

    // statisticByMonth = async () => {
    //     try {
    //         const thisMonthSuppliers = await Supplier.countDocuments({
    //             createdAt: { $gte: DateUtil.getStartOfCurrentMonth(), $lt: DateUtil.getCurrentDate() }
    //         });

    //         const lastMonthSuppliers = await Supplier.countDocuments({
    //             createdAt: { $gte: DateUtil.getStartOfLastMonth(), $lt: DateUtil.getEndOfLastMonth() }
    //         });

    //         const comparison = lastMonthSuppliers === 0 ? thisMonthSuppliers : (thisMonthSuppliers / lastMonthSuppliers);
    //         const percentageCompareLastMonth = comparison * 100;

    //         return {
    //             thisMonthSuppliers,
    //             lastMonthSuppliers,
    //             comparison,
    //             percentageCompareLastMonth,
    //         };
    //     } catch (error) {
    //         console.error('Error fetching monthly statistics:', error);
    //     }
    // };

    // statisticByYear = async () => {
    //     try {
    //         const thisYearSuppliers = await Supplier.countDocuments({
    //             createdAt: { $gte: DateUtil.getStartOfCurrentYear(), $lt: DateUtil.getCurrentDate() }
    //         });

    //         const lastYearSuppliers = await Supplier.countDocuments({
    //             createdAt: { $gte: DateUtil.getStartOfLastYear(), $lt: DateUtil.getEndOfLastYear() }
    //         });

    //         const comparison = lastYearSuppliers === 0 ? thisYearSuppliers : (thisYearSuppliers / lastYearSuppliers);
    //         const percentageCompareLastYear = comparison * 100;

    //         return {
    //             thisYearSuppliers,
    //             lastYearSuppliers,
    //             comparison,
    //             percentageCompareLastYear,
    //         };
    //     } catch (error) {
    //         console.error('Error fetching yearly statistics:', error);
    //     }
    // };


}

module.exports = new ScheduleController;   