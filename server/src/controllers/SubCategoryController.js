const mongoose = require("mongoose");
const SubCategory = require("../models/Subcategory");
const Category = require("../models/Category");
class SubCategoryController {
  all_get = async (req, res) => {
    try {
      const subcate = await SubCategory.find().populate("category");
      res.status(200).json(subcate);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message, code: error.code });
    }
  };
}
module.exports = new SubCategoryController();
