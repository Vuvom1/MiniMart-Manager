const errors = require('../constant/errors');
const Promotion = require('../models/Promotion')
const DateUtil = require('../util/DateUtil');

class PromotionController {

    all_get = async (req, res) => {
        try {
            const promotions = await Promotion
                .find()
                .populate('applicableProducts')
                .exec();

            res.status(200).json(promotions);
        } catch (error) {
            throw error
        }
    }

    getById_get = async (req, res) => {
        try {
            const promotion = await Promotion
                .findById(req.params.id)
                .populate('applicableProducts')
                .populate('giftItems')
                .exec();

            if (!promotion) {
                return res.status(404).json(errors.promotionNotFound);
            }

            res.status(200).json(promotion);
        } catch (error) {
            throw error
        }
    }

    create_post = async (req, res) => {
        try {
            const {
                promotion
            } = req.body;

            const createdPromotion = await Promotion.create(promotion);

            res.status(201).json("A new promotion has been created");
        } catch (error) {
            throw error;
        }
    };

    edit_put = async (req, res) => {
        try {
            const {
                promotion } = req.body;

            const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, {
                promotion
            });

            if (!promotion) {
                return res.status(404).json(errors.promotionNotFound);
            }

            res.status(200).json("Promotion has been updated");
        } catch (error) {
            throw error;
        }
    }

    statistics_get = async (req, res) => {
        try {
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
        } catch (error) {
            res.status(400).json({ message: error.message, code: error.code });
        }
    };

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