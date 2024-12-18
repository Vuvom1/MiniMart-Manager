const mongoose = require('mongoose');
const PromotionType = require('../constant/PromotionType');
const DiscountType = require('../constant/DiscountType');
const PromotionStatus = require('../constant/PromotionStatus');
const Product = require('./Product');
const TimeUtil = require('../util/TimeUtil');
const errors = require('../constant/errors');

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
    startDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    endTime: {
        type: String,
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
    maxUsage: { 
        type: Number,
        required: true, 
     },
    status: {
        type: String,
        required: true,
        enum: Object.values(PromotionStatus),
    },
}, { timestamps: true });

promotionSchema.pre('save', function (next) {

    if (this.discountType === DiscountType.PERCENTAGE && this.discountPercentage <= 0) {
        return next(new Error(errors.lowDiscountPercentage.code));
    }
    if (this.discountType === DiscountType.PERCENTAGE && this.discountPercentage > 100) {
        return next(new Error(errors.highDiscountPercentage.code));
    }
    if (this.type === PromotionType.PRODUCT_BASED && this.applicableProducts.length === 0) {
        return next(new Error(errors.noAppllicableProduct.code));
    }
    
    if (this.startDate > this.endDate) {
        return next(new Error(errors.promotionTime.code));
    }

    if (this.startDate === this.endDate) {
        if( TimeUtil.isTimeGreaterThan(this.startTime, this.endTime)) {
            return next(new Error(errors.promotionTime.code));
        }
    }

    if (this.maxUsage <= 0) {
        return next(new Error(errors.lowMaxUsage.code));
    }

    if (this.discountType === DiscountType.PERCENTAGE && this.maxDiscountAmount <= 0) {
        return next(new Error(errors.lowMaxDiscountAmount.code));   
    }

    if  (this.discountType === DiscountType.GET_MORE && this.requiredQuantity <= 0) {
        return next(new Error(errors.lowRequiredQuantity.code));
    }

    if (this.discountType === DiscountType.GET_MORE && this.rewardQuantity <= 0) {
        return next(new Error(errors.lowRewardQuantity.code));
    }

    if (this.discountType === DiscountType.FREE_GIFT && this.giftItems.length === 0) {
        return next(new Error(errors.noGiftItems.code));
    }

    if (!Object.values(PromotionStatus).includes(this.status)) {
        return next(new Error(errors.invalidPromotionStatus.code));
    }

    this.updatedAt = new Date();
    next();
});

promotionSchema.pre(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function (next) {
    try{
        const update = this.getUpdate();

        if (update.discountType === DiscountType.PERCENTAGE && update.discountPercentage <= 0) {
            return next(new Error(errors.lowDiscountPercentage.code));
        }
    
        if (update.discountType === DiscountType.PERCENTAGE && update.discountPercentage > 100) {
            return next(new Error(errors.highDiscountPercentage.code));
        }
    
        if (update.type === PromotionType.PRODUCT_BASED && update.applicableProducts.length === 0) {
            return next(new Error(errors.noAppllicableProduct.code));
        }

        if (update.startDate > update.endDate) {
            return next(new Error(errors.promotionTime.code));
        }
    
        if (update.startDate === update.endDate) {
            if( TimeUtil.isTimeGreaterThan(update.startTime, update.endTime)) {
                return next(new Error(errors.promotionTime.code));
            }
        }
    
        if (update.maxUsage <= 0) {
            return next(new Error(errors.lowMaxUsage.code));
        }
    
        if (update.discountType === DiscountType.PERCENTAGE && update.maxDiscountAmount <= 0) {
            return next(new Error(errors.lowMaxDiscountAmount.code));   
        }
    
        if  (update.discountType === DiscountType.GET_MORE && update.requiredQuantity <= 0) {
            return next(new Error(errors.lowRequiredQuantity.code));
        }
    
        if (update.discountType === DiscountType.GET_MORE && update.rewardQuantity <= 0) {
            return next(new Error(errors.lowRewardQuantity.code));
        }
    
        if (update.discountType === DiscountType.FREE_GIFT && update.giftItems.length === 0) {
            return next(new Error(errors.noGiftItems.code));
        }

        next();
    } catch(error) {
        next(error);
    }
    
})

promotionSchema.post(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function (result) {
    try {
        const updatedPromotion = await this.model.findOne(this.getQuery());

        if (updatedPromotion) {
           

            if (updatedPromotion.type !== PromotionType.PRODUCT_BASED) {
                updatedPromotion.applicableProducts = undefined;
            }

            if (updatedPromotion.type !== PromotionType.ORDER_BASED) {
                updatedPromotion.requireOrderAmount = undefined;
            }

            if (updatedPromotion.discountType !== DiscountType.PERCENTAGE) {
                updatedPromotion.discountPercentage = undefined;
                updatedPromotion.maxDiscountAmount = undefined;
            }

        if (updatedPromotion.discountType == DiscountType.PERCENTAGE) {
                updatedPromotion.requiredQuantity = undefined;
            }   

            if (updatedPromotion.discountType !== DiscountType.GET_MORE) {
                updatedPromotion.rewardQuantity = undefined;
            }

            if (updatedPromotion.discountType !== DiscountType.FREE_GIFT) {
                updatedPromotion.giftItems = undefined;
            }

            await updatedPromotion.save();
        }
    } catch (error) {
        console.error(error);
    }
});


const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
