const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    barcode: {
        type: String,
        unique: true, 
        required: true,
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory', 
        required: true,
    },
    detail: {
        type: String,
    },
    image: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
    },
    dateOfManufacture: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
