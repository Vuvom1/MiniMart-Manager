const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/", userController.all_get);
router.get("/customers", userController.get_customers);

module.exports = router;
