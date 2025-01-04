const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/ReceiptController");

router.get("/", receiptController.all_get);
router.post("/add", receiptController.add_post);
router.post("/addWithUser", receiptController.createWithUser_post);

module.exports = router;
