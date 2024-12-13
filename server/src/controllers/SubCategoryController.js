const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')
const Product = require('../models/Product')

class CategoryController {
    productsWithPromotions_get = async (req, res) => {
        try {
            const categories = await Category.find();

            res.status(200).json(categories);
        } catch (error) {
            throw error;
        }
    }

    
}

module.exports = new CategoryController;
