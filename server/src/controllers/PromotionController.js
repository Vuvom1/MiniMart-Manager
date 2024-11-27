const errors = require('../constant/errors');
const Promotion = require('../models/Promotion')

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
                name,
                code,
                startTime,
                endTime,
                status,
                maxUsage,
                description,
                type,
                discountType,
                fixedAmount,
                discountPercentage,
                maxDiscountAmount,
                applicableProducts,
                applicableOrderAmount,
                giftItems,
                requireQuantity,
                rewardQuantity,
                requireCustomerPoint,
            } = req.body;

            if (!name || !code || !type || !discountType || !startTime || !endTime) {
                return res.status(400).json("Required fields are missing");
            }

            const promotion = new Promotion({
                name,
                code,
                startTime,
                endTime,
                status,
                maxUsage,
                description,
                type,
                discountType,
                fixedAmount,
                discountPercentage,
                maxDiscountAmount,
                applicableProducts,
                applicableOrderAmount,
                giftItems,
                requireQuantity,
                rewardQuantity,
                requireCustomerPoint,
            });

            
            const savedPromotion = await promotion.save();
            res.status(201).json("A new promotion has been created");   
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    edit_put = async (req, res) => {
        try {
             const {
                name,
                code,
                startTime,
                endTime,
                status,
                maxUsage,
                description,
                type,
                discountType,
                fixedAmount,
                discountPercentage,
                maxDiscountAmount,
                applicableProducts,
                applicableOrderAmount,
                giftItems,
                requireQuantity,
                rewardQuantity,
                requireCustomerPoint,} = req.body;
            
                const promotion = await Promotion.findByIdAndUpdate(req.params.id, {
                    name,
                    code,
                    startTime,
                    endTime,
                    status,
                    maxUsage,
                    description,
                    type,
                    discountType,
                    fixedAmount,
                    discountPercentage,
                    maxDiscountAmount,
                    applicableProducts,
                    applicableOrderAmount,
                    giftItems,
                    requireQuantity,
                    rewardQuantity,
                    requireCustomerPoint,
                });

                if (!promotion) {
                    return res.status(404).json(errors.promotionNotFound);
                }

                res.status(200).json("Promotion has been updated");  
        } catch (error) {
            throw error;
        }
    }


}

module.exports = new PromotionController;   