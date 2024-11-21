const errors = require('../constant/errors');
const Product = require('../models/Product');
const ProductDTO = require('../dto/Product/ProductDTO');
const Category = require('../models/Category');

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

    allByCategory_get = async(req, res) => {
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

}

module.exports = new ProductController;   