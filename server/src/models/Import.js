const mongoose = require('mongoose');
const Supplier = require('./Supplier');     
const Product = require('./Product');  
const User = require('./User'); 

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

const importSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Supplier, 
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true,
    },
    deliveryMan: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, 
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true,
    },
    totalImportPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    importDetails: [importDetailSchema]
}, {timestamps: true});

const Import = mongoose.model('Import', importSchema);

module.exports = Import;
