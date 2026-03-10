const express = require("express");
const router = express.Router();
const { getAllEmployees, createEmployee, deleteEmployee } = require("../controllers/employeesController");

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
