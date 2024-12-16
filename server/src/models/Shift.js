const mongoose = require('mongoose');
const Position = require('./Position')
const Schedule = require('./Schedule');
const Salary = require('./Salary');
const Employee = require('./Employee');
const errors = require('../constant/errors');

const shiftSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    endTime: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    breakDuration: {
        type: String,
        required: false,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Schedule,
        required: true,
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Position,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
}, { timestamps: true });

shiftSchema.post('save', async function (shift, next) {
    try {
        const existingSchedule = await Schedule.findById(shift.schedule);

        if (!existingSchedule) {
            const error = new Error(errors.doesNotExistSchedule.code);
            return next(error);
        }

        const employee = await Employee.findById(existingSchedule.employee);
        if (!employee) {
            const error = new Error(errors.employeeNotFound.code);
            return next(error);
        }

        const shiftsInMonth = await Shift.find({
            schedule: shift.schedule,
            date: {
                $gte: new Date(shift.date.getFullYear(), shift.date.getMonth(), 1),
                $lte: new Date(shift.date.getFullYear(), shift.date.getMonth() + 1, 0)
            }
        });

        let totalHours = 0;
        shiftsInMonth.forEach(s => {
            const start = new Date(`1970-01-01T${s.startTime}:00Z`);
            const end = new Date(`1970-01-01T${s.endTime}:00Z`);
            totalHours += (end - start) / (1000 * 60 * 60);
        });

        const existingSalary = await Salary.findOne({ employee: employee._id, startDate: { $lte: shift.date }, endDate: { $gte: shift.date } });

        if (existingSalary) {
            await Salary.findByIdAndUpdate(existingSalary._id, { totalHours: totalHours, totalSalary: totalHours * employee.salaryPerHour });
        } else {
            const newSalary = new Salary({
                employee: employee._id,
                startDate: new Date(shift.date.getFullYear(), shift.date.getMonth(), 1),
                endDate: new Date(shift.date.getFullYear(), shift.date.getMonth() + 1, 0),
                totalHours: totalHours,
                totalSalary: totalHours * employee.salaryPerHour
            });

            await newSalary.save();
        }

        next();
    } catch (error) {
        next(error);
    }
});

shiftSchema.post('findOneAndUpdate', async function (doc, next) {
    try {
        const shift = await this.model.findOne(this.getQuery());

        if (!shift) {
            return next(new Error(errors.shiftNotFound.code));
        }

        const updatedShift = this.getUpdate();
        const existingSchedule = await Schedule.findById(shift.schedule);

        if (!existingSchedule) {
            return next(new Error(errors.doesNotExistSchedule.code));
        }

        const employee = await Employee.findById(existingSchedule.employee);
        if (!employee) {
            return next(new Error(errors.employeeNotFound.code));
        }

        const shiftsInMonth = await Shift.find({
            schedule: shift.schedule,
            date: {
                $gte: new Date(shift.date.getFullYear(), shift.date.getMonth(), 1),
                $lte: new Date(shift.date.getFullYear(), shift.date.getMonth() + 1, 0)
            }
        });

        let totalHours = 0;
        shiftsInMonth.forEach(s => {
            const start = new Date(`1970-01-01T${s.startTime}:00Z`);
            const end = new Date(`1970-01-01T${s.endTime}:00Z`);
            totalHours += (end - start) / (1000 * 60 * 60);
        });

        const existingSalary = await Salary.findOne({ employee: employee._id, startDate: { $lte: shift.date }, endDate: { $gte: shift.date } });
        if (!existingSalary) {
            const newSalary = new Salary({
                employee: employee._id,
                startDate: new Date(shift.date.getFullYear(), shift.date.getMonth(), 1),
                endDate: new Date(shift.date.getFullYear(), shift.date.getMonth() + 1, 0),
            });
            await newSalary.save();
        } else {
            await Salary.findByIdAndUpdate(existingSalary._id, { totalHours: totalHours, totalSalary: totalHours * employee.salaryPerHour });
        }

        next();
    } catch (error) {
        next(error);
    }
});

shiftSchema.pre('findOneAndDelete', async function (next) {
    try {
        const shift = await this.model.findOne(this.getQuery());
        if (!shift) {
            return next(new Error(errors.shiftNotFound.code));
        }

        const existingSchedule = await Schedule.findById(shift.schedule);
        if (!existingSchedule) {
            return next(new Error(errors.doesNotExistSchedule.code));
        }

        const employee = await Employee.findById(existingSchedule.employee);
        if (!employee) {
            return next(new Error(errors.employeeNotFound.code));
        }

        const shiftsInMonth = await Shift.find({
            schedule: shift.schedule,
            date: {
                $gte: new Date(shift.date.getFullYear(), shift.date.getMonth(), 1),
                $lte: new Date(shift.date.getFullYear(), shift.date.getMonth() + 1, 0)
            }
        });

        let totalHours = 0;
        shiftsInMonth.forEach(s => {
            const start = new Date(`1970-01-01T${s.startTime}:00Z`);
            const end = new Date(`1970-01-01T${s.endTime}:00Z`);
            const shiftStatartTime = new Date(`1970-01-01T${shift.startTime}:00Z`);
            const shiftEndTime = new Date(`1970-01-01T${shift.endTime}:00Z`);   
            totalHours += (end - start) / (1000 * 60 * 60) - (shiftEndTime - shiftStatartTime) / (1000 * 60 * 60);
        });

        const existingSalary = await Salary.findOne({ employee: employee._id, startDate: { $lte: shift.date }, endDate: { $gte: shift.date } });
        if (existingSalary) {
            await Salary.findByIdAndUpdate(existingSalary._id, { totalHours: totalHours, totalSalary: totalHours * employee.salaryPerHour });
        }

        next();
    } catch (error) {
        next(error);
    }
});

const Shift = mongoose.model('Shift', shiftSchema);
module.exports = Shift;
