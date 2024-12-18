const mongoose = require('mongoose');
const Supplier = require('./Supplier');
const Product = require('./Product');
const User = require('./User');
const ImportDetailSchema = require('./ImportDetail').schema;

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
        default: Date.now,
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    importDetails: {
        type: [ImportDetailSchema],
        required: true,
    },
    totalQuantity: {
        type: Number,
        default: 0,
    },
    totalImportPrice: {
        type: Number,
        default: 0,
    }

}, { timestamps: true });

importSchema.pre('save', function (next) {
    this.totalQuantity = this.importDetails.reduce((acc, importDetail) => acc + importDetail.quantity, 0);
    this.totalImportPrice = this.importDetails.reduce((acc, importDetail) => acc + importDetail.importPrice * importDetail.quantity, 0);
    next();
});

importSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.importDetails) {
        const totalQuantity = update.importDetails.reduce((acc, importDetail) => acc + importDetail.quantity, 0);
        const totalImportPrice = update.importDetails.reduce((acc, importDetail) => acc + importDetail.importPrice * importDetail.quantity, 0);
        this.setUpdate({
            ...update,
            totalQuantity,
            totalImportPrice
        });
    }
    next();
});

const Import = mongoose.model('Import', importSchema);

module.exports = Import;
