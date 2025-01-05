const Order = require('../models/Order')
const Receipt = require('../models/Receipt')
const Customer = require('../models/Customer')
const User = require('../models/User')
const CustomerController = require('./CustomerController')
const { CUSTOMER_POINT_PERCENT } = require('../constant/CustomerPoint')
const asyncErrorHandler = require('../util/asyncErrorHandler')
const errors = require('../constant/errors')

class OrderController {
    all_get = asyncErrorHandler(async (req, res, next) => {
        const orders = await Order
            .find()
            .populate('receipt')
            .exec();

        res.status(200).json(orders);
    })

    getById_get = asyncErrorHandler(
        async (req, res) => {

            const { id } = req.params;
            const order = await Order
                .findById(id)
                .populate('receipt')
                .populate({
                    path: 'receipt',
                    populate: { path: 'details.product' }
                })
                .populate({
                    path: 'receipt',
                    populate: { path: 'giftItems.product' }
                })
                .exec();

            res.status(200).json(order);
        }
    )

    getOrdersSortedByStatuses_get = asyncErrorHandler(
        async (req, res, next) => {
          
                const orders = await Order
                    .find()
                    .populate('receipt')
                    .populate({
                        path: 'receipt',
                        populate: { path: 'details.product' }
                    })
                    .exec();
        
                const statusesWithOrders = orders.reduce((acc, order) => {
                    const status = order.status;
                    if (!acc[status]) {
                        acc[status] = [];
                    }
                    acc[status].push(order);
                    return acc;
                }, {});
                return res.status(200).json(statusesWithOrders);
        }
    ) 
    
    getOrderGroupedByStatusesByUserId_get = asyncErrorHandler(
        async (req, res) => {
            
                const { id } = req.params;
                const user = await User.findById(id);
                const customer = await Customer.findOne({ user: user._id });
                if (!customer) {
                    return res.status(400).json('Customer not found');
                }
        
                const receipts = await Receipt.find({ customer: customer._id });
                if (!receipts) {
                    return res.status(400).json('Receipt not found');
                }
        
                const receiptIds = receipts.map(receipt => receipt._id);
                const orders = await Order
                    .find({ receipt: { $in: receiptIds } })
                    .populate('receipt')
                    .populate({
                        path: 'receipt',
                        populate: { path: 'details.product' }
                    })
                    .exec();
        
                const statusesWithOrders = orders.reduce((acc, order) => {
                    const status = order.status;
                    if (!acc[status]) {
                        acc[status] = [];
                    }
                    acc[status].push(order);
                    return acc;
                }, {});
        
                return res.status(200).json(statusesWithOrders);
        }
    ) 
    
    createWithUser_post = asyncErrorHandler (
        async (req, res, next) => {
                const { order, user } = req.body;

                if (!order.receipt || !order.receipt.details ) {
                    const error = new Error(errors.requiredFieldMissing.code);
                    next(error);
                }

                if (!order.receipt.paymentMethod || !order.receipt.time || !order.receipt.transactionType) {
                    const error = new Error(errors.requiredFieldMissing.code);
                    next(error);
                }
        
                const customer = await Customer.findOne({ user: user._id });
        
                if (!customer) {
                    const error = new Error(errors.customerNotFound.code);
                    next(error);
                }
        
                order.receipt.customer = customer._id;
                const receipt = await Receipt.create(order.receipt);
                const addedPoint = receipt.totalPrice * CUSTOMER_POINT_PERCENT;
                const updatedCustomer = await CustomerController.addPointToCustomer(customer._id, addedPoint);
        
                order.receipt = receipt._id;
        
                const createdOrder = await Order.create(order);
        
                return res.status(201).json("Order created successfully");     
        }
    )
    
    updateStatus_put = asyncErrorHandler(
        async (req, res) => {
           
                const { id } = req.params;
                const { status } = req.body;
                await Order.findByIdAndUpdate(id, { status }, { new: true });
        
                return res.status(200).json('Order status updated successfully');
        }
    ) 

}




module.exports = new OrderController;