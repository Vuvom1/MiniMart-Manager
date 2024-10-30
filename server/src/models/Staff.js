const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    startWorkingDate: {
        type: Date,
        required: true,
    },
    salaryPerHour: {
        type: Double,
        requirer: true,
    }

    
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
