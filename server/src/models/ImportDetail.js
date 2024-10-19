const mongoose = require('mongoose');

const importDetailSchema = new mongoose.Schema({
    importId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Import',  
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const ImportDetail = mongoose.model('ImportDetail', importDetailSchema);

module.exports = ImportDetail;
