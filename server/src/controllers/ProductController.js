const errors = require("../constant/errors");
const Product = require("../models/Product");
const ProductDTO = require("../dto/Product/ProductDTO");
const Category = require("../models/Category");
const Promotion = require("../models/Promotion");
const PromotionType = require("../constant/PromotionType");
const SubCategory = require("../models/SubCategory");

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
        promotion,
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
        promotion,
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

  popular_get = async (req, res) => {
    try {
      const popularProducts = await Product.find()
        .sort({ sold: -1 })
        .limit(10)
        .populate("subCategory")
        .populate({
          path: "subCategory",
          populate: { path: "category" },
        })
        .exec();

      res.status(200).json(popularProducts);
    } catch (error) {
      throw error;
    }
  };

  getTop10DiscountProducts = async (req, res) => {
    try {
      const promotions = await Promotion.find({
        type: PromotionType.PRODUCT_BASED,
      }).exec();
      const productsWithPromotions = await Promise.all(
        promotions.map(async (promotion) => {
          const products = await Product.find({
            _id: { $in: promotion.applicableProducts },
          }).exec();
          return products.map((product) => ({
            ...product.toObject(),
            promotion: promotion,
          }));
        })
      );

      const flattenedProducts = []
        .concat(...productsWithPromotions)
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, 10);

      res.status(200).json(flattenedProducts);
    } catch (error) {
      throw error;
    }
  };

  productsAndPromotionsBySubCategory_get = async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Product.find({ subCategory: id })
        .populate("subCategory")
        .exec();

      const promotions = await Promotion.find({
        type: PromotionType.PRODUCT_BASED,
      }).exec();
      const productsWithPromotions = products.map((product) => {
        const productPromotion = promotions.find((promotion) =>
          promotion.applicableProducts.includes(product._id)
        );
        return {
          ...product.toObject(),
          promotion: productPromotion,
        };
      });

      res.status(200).json(productsWithPromotions);
    } catch (error) {
      throw error;
    }
  };

  detailsWithPromotionById_get = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).populate("subCategory").exec();

      const promotions = await Promotion.find({
        type: PromotionType.PRODUCT_BASED,
      }).exec();
      const productPromotion = promotions.find((promotion) =>
        promotion.applicableProducts.includes(product._id)
      );

      res.status(200).json({
        ...product.toObject(),
        promotion: productPromotion,
      });
    } catch (error) {
      throw error;
    }
  };

  getSimilarProductsWithPromotions = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).exec();
      const similarProducts = await Product.find({
        subCategory: id,
        _id: { $ne: id },
      }).exec();

      const promotions = await Promotion.find({
        type: PromotionType.PRODUCT_BASED,
      }).exec();
      const similarProductsWithPromotions = similarProducts.map((product) => {
        const productPromotion = promotions.find((promotion) =>
          promotion.applicableProducts.includes(product._id)
        );
        return {
          ...product.toObject(),
          promotion: productPromotion,
        };
      });

      res.status(200).json(similarProductsWithPromotions);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ProductController();
