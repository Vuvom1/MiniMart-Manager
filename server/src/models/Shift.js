const mongoose = require('mongoose');
const Style = require('./Style')

const shiftSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    style: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Style',
        required: false,
    }
});

const Shift = mongoose.model('Shift', shiftSchema);
module.exports = Shift;
