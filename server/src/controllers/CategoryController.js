const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')
const Product = require('../models/Product')

class CategoryController {
    all_get = async (req, res) => {
        try {
            const categories = await Category.find();

            res.status(200).json(categories);
        } catch (error) {
            throw error;
        }
    }

    subCategoriesWithProducts_get = async (req, res) => {     
        try {
            const { id } = req.params;
            const subcategories = await SubCategory.find({ category: id });

            for (let i = 0; i < subcategories.length; i++) {
                const products = await Product.find({ subCategory: subcategories[i]._id });
                subcategories[i] = subcategories[i].toObject();
                subcategories[i].products = products;
            }

            res.status(200).json(subcategories);
        } catch (error) {
            throw error;
        }
    } 
}

module.exports = new CategoryController;
