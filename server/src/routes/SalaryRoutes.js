const salaryController = require("../controllers/SalaryController");
const express = require("express");
const router = express.Router();
router.get("/", salaryController.all_get);
router.get("/getbyemployee", salaryController.get_by_employee);
router.put("/:id", salaryController.edit_put);

module.exports = router;
