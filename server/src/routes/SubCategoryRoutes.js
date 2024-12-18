const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/SubCategoryController");
router.get("/", subCategoryController.all_get);
module.exports = router;
