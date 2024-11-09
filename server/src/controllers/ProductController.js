const errors = require('../constant/errors');
const Product = require('../models/Product');
const ProductDTO = require('../dto/Product/ProductDTO')

class ProductController {

    all_get = async (req, res) => {
        try {
            const products = await Product.find();

            const productDTOs = products.map(product => new ProductDTO(product));
            console.log(productDTOs)

            res.status(200).json(productDTOs);
        } catch (error) {
            throw error
        }
    }

}

module.exports = new ProductController;   