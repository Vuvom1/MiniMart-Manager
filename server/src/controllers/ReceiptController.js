const Receipt = require("../models/Receipt");
const Delivery = require("../models/Order");
const TransactionType = require("../constant/TransactionType");
const Customer = require("../models/Customer");
const Promotion = require("../models/Promotion");
const asyncErrorHandler = require("../util/asyncErrorHandler");

class ReceiptController {
  all_get = asyncErrorHandler(async (req, res) => {
    const receipts = await Receipt.find()
      .populate("customer")
      .populate("details.product")
      .exec();
    res.status(200).json(receipts);
  });
  add_post = async (req, res) => {
    const {
      paymentMethod,
      transactionType,
      details,
      giftItems,
      status,
      receiptNumber,
    } = req.body;
    try {
      const receipt = Receipt.create({
        customer: "677783c1d25a9f9bfe49e644",
        paymentMethod,
        time: new Date(),
        transactionType,
        details,
        giftItems,
        status,
        receiptNumber,
      });
      res.status(200).json({
        message: "New receipt created!",
        data: receipt,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
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
  };
}

module.exports = new ReceiptController();
