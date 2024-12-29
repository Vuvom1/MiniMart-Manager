const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/ReceiptController");

router.get("/", receiptController.all_get);
router.post("/addWithUser", receiptController.createWithUser_post);

module.exports = router;
