const mongoose = require('mongoose');
const User = require('./User');

const customerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    point: {
        type: Number,
        default: 0,
    },  
}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
