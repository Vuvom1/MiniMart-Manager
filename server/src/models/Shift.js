const mongoose = require('mongoose');
const Position = require('./Position')

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
        ref: 'Schedule',
        required: true,
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const Shift = mongoose.model('Shift', shiftSchema);
module.exports = Shift;
