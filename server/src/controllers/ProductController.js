const errors = require("../constant/errors");
const Product = require("../models/Product");
const SubCategory = require("../models/Subcategory");

class ProductController {
  all_get = async (req, res) => {
    try {
      const products = await Product.find().populate("subCategory");
      const products2 = await Product.aggregate([
        {
          $lookup: {
            from: "subCategories",
            localField: "subCategory",
            foreignField: "_id",
            as: "subCategory",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "subCategory.category",
            foreignField: "_id",
            as: "category",
          },
        },
      ]);

      res.status(200).json(products);
    } catch (error) {
      throw error;
    }
  };
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
  };
  get = async (req, res) => {
    const { id } = req.params;
    try {
      const product_by_id = await Product.findById(id).populate("subCategory");
      res.status(200).json(product_by_id);
    } catch (error) {
      throw error;
    }
  };
  add_post = async (req, res) => {
    const {
      name,
      price,
      barcode,
      detail,
      image,
      stock,
      dateOfManufacture,
      expiryDate,
      subCategory,
      status,
    } = req.body;
    try {
      const product = await Product.create({
        name,
        price,
        barcode,
        detail,
        image,
        stock,
        dateOfManufacture,
        expiryDate,
        subCategory,
        status,
      });
      res.status(200).json({
        message: "New product created!",
        data: product,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  edit_put = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        price,
        barcode,
        detail,
        image,
        stock,
        dateOfManufacture,
        expiryDate,
        subCategory,
      } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        name,
        price,
        barcode,
        detail,
        image,
        stock,
        dateOfManufacture,
        expiryDate,
        subCategory,
      });
      res
        .status(200)
        .json({ message: "Update product successfully", data: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message, code: error.code });
    }
  };
  delete = (req, res) => {
    const { id } = req.params;
    try {
      Product.findOneAndDelete({ id: id });
      res.status(200).json({ message: "Remove product successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message, code: error.code });
    }
  };
}

module.exports = new ProductController();
