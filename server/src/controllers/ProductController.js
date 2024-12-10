const errors = require('../constant/errors');
const Product = require('../models/Product');
const ProductDTO = require('../dto/Product/ProductDTO');
const Category = require('../models/Category');
const Promotion = require('../models/Promotion');
const PromotionType = require('../constant/PromotionType');

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

    popular_get = async (req, res) => {
        try {
            const popularProducts = await Product
                .find()
                .sort({ sold: -1 })
                .limit(10)
                .populate('subCategory')
                .populate({
                    path: 'subCategory',
                    populate: { path: 'category' }
                })
                .exec();

            res.status(200).json(popularProducts);
        } catch (error) {
            throw error;
        }
    }

    getTop10DiscountProducts = async (req, res) => {
        try {
            const promotions = await Promotion.find({ type: PromotionType.PRODUCT_BASED }).exec();
            const productsWithPromotions = await Promise.all(promotions.map(async (promotion) => {
                const products = await Product.find({ _id: { $in: promotion.applicableProducts } }).exec();
                return products.map(product => ({
                    ...product.toObject(),
                    promotion: promotion,
                }));
            }));

            const flattenedProducts = [].concat(...productsWithPromotions).sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 10);

            res.status(200).json(flattenedProducts);
        } catch (error) {
            throw error;
        }
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