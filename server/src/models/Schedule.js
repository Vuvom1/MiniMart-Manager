const mongoose = require('mongoose');
const Shift = require('./Shift')

const scheduleDetailSchema = {
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        required: true 
    },
    isAbsent: {
        type: Boolean,
        required: false,
    }
};


const scheduleSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    scheduleDetails: [scheduleDetailSchema]
},  {timestamps: true});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;
