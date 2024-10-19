const mongoose = require('mongoose');

const importSchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', 
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff', 
        required: true,
    },
    totalProducts: {
        type: Number,
        required: true,
    },
    totalExpenditure: {
        type: Double,
        required: true,
    }
});

const Import = mongoose.model('Import', importSchema);

module.exports = Import;
