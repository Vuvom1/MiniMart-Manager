const { PAID } = require("./ReceiptStatus");

const OrderStatus = Object.freeze({
    PENDING: 'Pending',
    WAIT_FOR_PAYMENT: 'Wait for payment',
    PAID: 'Paid',   
    DELIVERING: 'Delivering',
    DELIVERED: 'Delivered',
    CANCELED: 'Canceled',
})

module.exports = OrderStatus;