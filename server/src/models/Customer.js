const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    point: {
        type: Number,
    },  
});

const Import = mongoose.model('Customer', customerSchema);

module.exports = Customer;
