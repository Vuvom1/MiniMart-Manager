const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/EmployeeController");

router.get("/", employeeController.all_get);
router.get('/unscheduled', employeeController.unScheduledEmployees_get);
router.get("/:id", employeeController.get_by_id);
router.post("/add", employeeController.add_post);
router.put("/update/:id", employeeController.edit_put);
router.delete("/delete/:id", employeeController.delete);

module.exports = router;