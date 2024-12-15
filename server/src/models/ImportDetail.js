const mongoose = require('mongoose');
const Product = require('./Product');

const importDetailSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,  
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    importPrice: {
        type: Number,
        required: true,
    },    
});

const ImportDetail = mongoose.model('ImportDetail', importDetailSchema);
module.exports = ImportDetail;