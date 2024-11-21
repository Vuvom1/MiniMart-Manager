const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', 
        required: true,
    },
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;
