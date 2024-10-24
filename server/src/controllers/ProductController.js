const errors = require('../constant/errors');
const Product = require('../models/Product');

class ProductController {

    all_get = async (req, res) => {
        try {
            const products = await Product.find();

            res.status(200).json(products);
        } catch (error) {
            throw error
        }
    }

}

module.exports = new ProductController;   