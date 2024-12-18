const mongoose = require('mongoose');
const Employee = require('./Employee');
const errors = require('../constant/errors');

const Schema = mongoose.Schema;

const salarySchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: Employee,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalHours: {
        type: Number,
        required: true,
        default: 0, 
    },
    totalSalary: {
        type: Number,
        required: true, 
        default: 0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Salary = mongoose.model('Salary', salarySchema);
module.exports = Salary;
