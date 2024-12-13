const mongoose = require('mongoose');
const OrderStatus = require('../constant/OrderStatus');
const Receipt = require('./Receipt');

const orderSchema = new mongoose.Schema({
    receipt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Receipt,
        required: true,
    },
    deliveryFee: {
        type: Number,
        default: 0,
    },
    receipientName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
    },
    notes: {
        type: String,
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
