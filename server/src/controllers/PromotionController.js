const DiscountType = require('../constant/DiscountType');
const PromotionType = require('../constant/PromotionType');
const errors = require('../constant/errors');
const Promotion = require('../models/Promotion')
const DateUtil = require('../util/DateUtil');
const User = require('../models/User');
const Customer = require('../models/Customer');
const Receipt = require('../models/Receipt');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const PromotionStatus = require('../constant/PromotionStatus');
const TimeUtil = require('../util/TimeUtil');

class PromotionController {

    all_get = asyncErrorHandler(async (req, res, next) => {

        const promotions = await Promotion
            .find()
            .populate('applicableProducts')
            .exec();

        res.status(200).json(promotions);

    });

    getById_get = asyncErrorHandler(async (req, res, next) => {

        const promotion = await Promotion
            .findById(req.params.id)
            .populate('applicableProducts')
            .populate('giftItems')
            .exec();

        if (!promotion) {
            const error = new Error(errors.promotionNotFound);
            return next(error);

        }

        return res.status(200).json(promotion);
    })

    usablePromotionsByUserId_get = asyncErrorHandler(async (req, res, next) => {
        
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            const error = new Error(errors.userNotFound.code);
            return next(error);
        }

        const customer = await Customer.findOne({ user: user._id });
        if (!customer) {
            const error = new Error(errors.customerNotFound.code);
            return next(error);
        }

        const promotions = await Promotion.find({
            status: PromotionStatus.ACTIVE,
            type: PromotionType.ORDER_BASED,
            startDate: { $lte: DateUtil.getCurrentDate() },
            endDate: { $gte: DateUtil.getCurrentDate() },
        })
        .populate('giftItems');

        const usedPromotionIds = await Receipt.find({ customer: customer._id }).distinct('promotion');
        const usablePromotions = promotions.filter(promotion => !usedPromotionIds.includes(promotion._id.toString()));

        return res.status(200).json(usablePromotions);
    });

    create_post = asyncErrorHandler(async (req, res, next) => {

        const {
            promotion
        } = req.body;

        if (!promotion.name || !promotion.code || !promotion.type || !promotion.discountType || !promotion.startTime || !promotion.endTime || !promotion.status) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        const existingCode = await Promotion.findOne({ code: promotion.code });

        if (existingCode) {
            const error = new Error(errors.alreadyExistPromotionCode.code);
            return next(error);
        }

        if (promotion.type === PromotionType.PRODUCT_BASED && promotion.discountPercentage && !promotion.maxDiscountAmount) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        if (promotion.type === PromotionType.PRODUCT_BASED && !promotion.applicableProducts) {
            const error = new Error(errors.noAppllicableProduct.code);
            return next(error);
        }

        if (promotion.type === PromotionType.ORDER_BASED && !promotion.requireOrderAmount) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        if (promotion.discountType === DiscountType.PERCENTAGE && !promotion.discountPercentage) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        if (promotion.discountType === DiscountType.GET_MORE && (!promotion.requiredQuantity || !promotion.rewardQuantity)) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        if (promotion.discountType === DiscountType.FREE_GIFT && !promotion.giftItems) {
            const error = new Error(errors.noGiftItems.code);
            return next(error);
        }

        const createdPromotion = await Promotion.create(promotion);
        return res.status(201).json("A new promotion has been created");

    });

    edit_put = asyncErrorHandler(async (req, res, next) => {
        const { promotion } = req.body;

        
        if (!promotion.name || !promotion.code || !promotion.type || !promotion.discountType || !promotion.status) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        if (promotion.type === PromotionType.PRODUCT_BASED && promotion.discountPercentage && !promotion.maxDiscountAmount) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        if (promotion.type === PromotionType.PRODUCT_BASED && !promotion.applicableProducts) {
            const error = new Error(errors.noAppllicableProduct.code);
            return next(error);
        }

        if (promotion.type === PromotionType.ORDER_BASED && !promotion.requireOrderAmount) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        if (promotion.discountType === DiscountType.PERCENTAGE && !promotion.discountPercentage) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        if (promotion.discountType === DiscountType.GET_MORE && (!promotion.requiredQuantity || !promotion.rewardQuantity)) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        if (promotion.discountType === DiscountType.FREE_GIFT && !promotion.giftItems) {
            const error = new Error(errors.noGiftItems.code);
            return next(error);
        }

        const existingCode = await Promotion.findOne({ code: promotion.code, _id: { $ne: req.params.id } });

        if (existingCode) {
            const error = new Error(errors.alreadyExistPromotionCode.code);
            return next(error);
        }

        if (!Object.values(PromotionStatus).includes(promotion.status)) {
            const error = new Error(errors.invalidPromotionStatus.code);
            return next(error);
        }

        const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, promotion, { new: true });

        return res.status(200).json("Promotion has been updated");
    })

    statistics_get = asyncErrorHandler(
        async (req, res) => {

            const totalPromotions = await Promotion.countDocuments();

            const statisticByDate = await this.statisticByDate();
            const statisticByMonth = await this.statisticByMonth();
            const statisticByYear = await this.statisticByYear();

            res.status(200).json({
                totalPromotions,
                statisticByDate,
                statisticByMonth,
                statisticByYear,
            });
        }
    );

    statisticByDate = async () => {
        try {
            const todayPromotions = await Promotion.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfToday(), $lt: DateUtil.getCurrentDate() }
            });

            const yesterdayPromotions = await Promotion.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfYesterday(), $lt: DateUtil.getEndOfYesterday() }
            });

            const comparison = yesterdayPromotions === 0 ? todayPromotions : (todayPromotions / yesterdayPromotions);
            const percentageCompareYesterday = comparison * 100;

            return {
                todayPromotions,
                yesterdayPromotions,
                comparison,
                percentageCompareYesterday,
            };
        } catch (error) {
            throw error;
        }
    };


    statisticByMonth = async () => {
        try {
            const thisMonthPromotions = await Promotion.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfCurrentMonth(), $lt: DateUtil.getCurrentDate() }
            });

            const lastMonthPromotions = await Promotion.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfLastMonth(), $lt: DateUtil.getEndOfLastMonth() }
            });

            const comparison = lastMonthPromotions === 0 ? thisMonthPromotions : (thisMonthPromotions / lastMonthPromotions);
            const percentageCompareLastMonth = comparison * 100;

            return {
                thisMonthPromotions,
                lastMonthPromotions,
                comparison,
                percentageCompareLastMonth,
            };
        } catch (error) {
            console.error('Error fetching monthly statistics:', error);
        }
    };

    statisticByYear = async () => {
        try {
            const thisYearPromotions = await Promotion.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfCurrentYear(), $lt: DateUtil.getCurrentDate() }
            });

            const lastYearPromotions = await Promotion.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfLastYear(), $lt: DateUtil.getEndOfLastYear() }
            });

            const comparison = lastYearPromotions === 0 ? thisYearPromotions : (thisYearPromotions / lastYearPromotions);
            const percentageCompareLastYear = comparison * 100;

            return {
                thisYearPromotions,
                lastYearPromotions,
                comparison,
                percentageCompareLastYear,
            };
        } catch (error) {
            console.error('Error fetching yearly statistics:', error);
        }
    };


}

module.exports = new PromotionController;   