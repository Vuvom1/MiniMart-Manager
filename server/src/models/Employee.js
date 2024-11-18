const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    startWorkingDate: {
        type: Date,
        required: true,
    },
    salaryPerHour: {
        type: Number,
        required: true,
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
