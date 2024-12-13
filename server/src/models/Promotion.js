const mongoose = require('mongoose');
const PromotionType = require('../constant/PromotionType');
const DiscountType = require('../constant/DiscountType');
const PromotionStatus = require('../constant/PromotionStatus');
const Product = require('./Product');

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: Object.values(PromotionType),
        required: true,
    },
    discountType: {
        type: String,
        enum: Object.values(DiscountType),
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: function () {
            return this.discountType === DiscountType.PERCENTAGE;
        },
    },
    maxDiscountAmount: {
        type: Number,
        required: function () {
            return this.discountType === DiscountType.PERCENTAGE;
        },
    },

    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    applicableProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product,
            required: function () {
                return this.type === PromotionType.PRODUCT_BASED;
            },
        },
    ],
    requireOrderAmount: {
        type: Number,
        required: function () {
            return this.type === PromotionType.ORDER_BASED;
        },
    },

    requiredQuantity: {
        type: Number,
        required: function () {
            return this.discountType === DiscountType.GET_MORE;
        },
    },
    rewardQuantity: {
        type: Number,
        required: function () {
            return this.discountType === DiscountType.GET_MORE;
        },
    },

    applicableCustomerPoint: {
        type: Number,
        required: function () {
            return this.type === PromotionType.CUSTOMER_BASED;
        },
    },
    giftItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product,
            required: function () {
                return this.discountType === DiscountType.FREE_GIFT;
            },
        },
    ],
    maxUsage: { type: Number },
    status: {
        type: String,
        required: true,
        enum: Object.values(PromotionStatus),
    },
}, { timestamps: true });

promotionSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
