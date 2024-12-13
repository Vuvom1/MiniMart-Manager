const Receipt = require('../models/Receipt');
const Delivery = require('../models/Order');
const TransactionType = require('../constant/TransactionType');
const Customer = require('../models/Customer');
const Promotion = require('../models/Promotion');

class ReceiptController {

    createWithUser_post = async (req, res) => {
        try {
            // const { receipt, user } = req.body;

            // if (receipt.transactionType && receipt.transactionType === TransactionType.DELIVERY) { 
            //     const delivery = new Delivery(receipt.delivery);
            //     const savedDelivery = await delivery.save();
            //     receipt.delivery = savedDelivery._id;
            // }

            // if (receipt.promotion) {
            //     const promotion = await Promotion.findOne({ code: receipt.promotion });

            //     if (!promotion) {
            //         return res.status(400).json("Promotion not found");
            //     }
            // }

            // const customer = await Customer.findOne({ user: user._id });

            // if (!customer) {
            //     return res.status(400).json('Customer not found');
            // }
            
            // receipt.customer = customer._id;

            // await Receipt.create(receipt); 

            return res.status(201).json("New receipt has been created");
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ReceiptController;