const mongoose = require('mongoose');
const PaymentMethod = require('../constant/PaymentMethod');
const ReceiptStatus = require('../constant/ReceiptStatus');
const TransactionType = require('../constant/TransactionType');
const ReceiptUtil = require('../util/ReceiptUtil');
const Customer = require('./Customer');
const Employee = require('./Employee');
const Promotion = require('./Promotion');
const Product = require('./Product');

const receiptSchema = new mongoose.Schema({
    receiptNumber: {
        type: String,
        default: ReceiptUtil.generateReceiptNumber,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee,
    },
    promotion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Promotion,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: Object.values(PaymentMethod),
    },
    time: {
        type: Date,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
        enum: Object.values(TransactionType),
    },
    details: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            netPrice: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: function() {
            return this.details.reduce((acc, item) => acc + item.netPrice * item.quantity, 0);
        }, 
        },
        
    totalNetPrice: {
        type: Number,
        default: function() {
            return this.totalPrice;
        }, 
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(ReceiptStatus),
    },
}, { timestamps: true });

const Receipt = mongoose.model('Receipt', receiptSchema);
module.exports = Receipt;
