const errors = require('../constant/errors');
const Product = require('../models/Product');
const ProductDTO = require('../dto/Product/ProductDTO');
const Category = require('../models/Category');
const Promotion = require('../models/Promotion');
const PromotionType = require('../constant/PromotionType');
const Receipt = require('../models/Receipt');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const DiscountType = require('../constant/DiscountType');

class ProductController {

    all_get = async (req, res) => {
        try {
            const products = await Product
                .find()
                .populate('subCategory')
                .populate({
                    path: 'subCategory',
                    populate: { path: 'category' }
                })
                .exec();

            res.status(200).json(products);
        } catch (error) {
            throw error
        }
    }

    allByCategory_get = async (req, res) => {
        try {
            const categoriesWithProducts = await Category.aggregate([
                {
                    $lookup: {
                        from: "subcategories",
                        localField: "_id",
                        foreignField: "category",
                        as: "subCategories",
                    },
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "subCategories._id",
                        foreignField: "subCategory",
                        as: "products",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        products: 1,
                    },
                },
            ]);

            res.status(200).json(categoriesWithProducts);
        } catch (error) {
            throw error;
        }
    }

    popularWithPromotion_get = asyncErrorHandler(async (req, res) => {
            const promotions = await Promotion.find({ type: PromotionType.PRODUCT_BASED }).exec();
            const productsWithPromotions = await Promise.all(promotions.map(async (promotion) => {
                const products = await Product.find({ _id: { $in: promotion.applicableProducts } }).exec();
                return products.map(product => ({
                ...product.toObject(),
                promotion: promotion,
                }));
            }));

            const topSaleProducts = await Receipt.aggregate([
                { $unwind: "$details" },
                { $group: { _id: "$details.product", totalQuantity: { $sum: "$details.quantity" } } },
                { $sort: { totalQuantity: -1 } },
                { $limit: 10 },
                { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
                { $unwind: "$product" },
                { $project: { _id: 0, product: 1, totalQuantity: 1 } }
            ]).exec();

            const topSaleProductsWithPromotions = topSaleProducts.map(item => {
                const productPromotion = promotions.find(promotion => promotion.applicableProducts.includes(item.product._id));
                return {
                ...item.product,
                totalQuantity: item.totalQuantity,
                promotion: productPromotion
                };
            });

            productsWithPromotions.push(...topSaleProductsWithPromotions);

        return res.status(200).json(topSaleProductsWithPromotions);
        
    }) 

    getTop10DiscountProducts = async (req, res) => {
            const products = await Product.find().exec();

            const promotions = await Promotion.find({ type: PromotionType.PRODUCT_BASED }).exec();

            const productsWithPromotions = products.map(product => {
                const productPromotion = promotions.find(promotion => promotion.applicableProducts.includes(product._id));
                return {
                    ...product.toObject(),
                    promotion: productPromotion
                };
            });

            const top10DiscountProducts = productsWithPromotions
                .filter(product => product.promotion)
                .sort((a, b) => {
                    const discountA = a.promotion.discountType === DiscountType.PERCENTAGE ? a.promotion.discountPercentage : a.promotion.maxDiscountAmount;
                    const discountB = b.promotion.discountType === DiscountType.PERCENTAGE ? b.promotion.discountPercentage : b.promotion.maxDiscountAmount;
                    return discountB - discountA;
                })
                .slice(0, 10);

            res.status(200).json(productsWithPromotions);
    }

    productsAndPromotionsBySubCategory_get = async (req, res) => {
        try {
            const { id } = req.params;
            const products = await Product
                .find({ subCategory: id })
                .populate('subCategory')
                .exec();

            const promotions = await Promotion.find({ type: PromotionType.PRODUCT_BASED }).exec();
            const productsWithPromotions = products.map(product => {
                const productPromotion = promotions.find(promotion => promotion.applicableProducts.includes(product._id));
                return {
                    ...product.toObject(),
                    promotion: productPromotion
                };
            })

            res.status(200).json(productsWithPromotions);
        } catch (error) {
            throw error;
        }
    }

    detailsWithPromotionById_get = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product
                .findById(id)
                .populate('subCategory')
                .exec();

            const promotions = await Promotion.find({ type: PromotionType.PRODUCT_BASED }).exec();
            const productPromotion = promotions.find(promotion => promotion.applicableProducts.includes(product._id));

            res.status(200).json({
                ...product.toObject(),
                promotion: productPromotion
            });
        } catch (error) {
            throw error;
        }
    }

    getSimilarProductsWithPromotions = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id).exec();
            const similarProducts = await Product.find({ subCategory: id, _id: { $ne: id } })
            .exec();

            const promotions = await Promotion.find({ type: PromotionType.PRODUCT_BASED }).exec();
            const similarProductsWithPromotions = similarProducts.map(product => {
                const productPromotion = promotions.find(promotion => promotion.applicableProducts.includes(product._id));
                return {
                    ...product.toObject(),
                    promotion: productPromotion
                };
            })

            res.status(200).json(similarProductsWithPromotions);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductController;   