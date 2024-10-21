const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    desciption: {
        type: String,
    },
    minInvoice: {
        type: Number,
        required: true,
    },
    discountPercent: {
        type: Number,
        required: true,
    },
    maxDiscount: {
        type: Number,
        required: true,
    }

    
});

const Import = mongoose.model('Promotion', promotionSchema);

module.exports = Import;
