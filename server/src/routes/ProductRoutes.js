const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.get("/", productController.all_get);
router.get("/getByCategories", productController.allByCategory_get);
router.get("/:id", productController.get);
router.post("/add", productController.add_post);
router.put("/:id", productController.edit_put);
router.delete("/:id", productController.delete);

module.exports = router;
