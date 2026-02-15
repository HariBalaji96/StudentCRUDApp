const express = require("express");
const router = express.Router();
const studentController = require("../controllers/controllers");

// GET all students
router.get("/", studentController.getAllStudents);

// GET student by rollNo
router.get("/:rollNo", studentController.getStudentByRollNo);

// POST create student
router.post("/", studentController.createStudent);

// PUT update student
router.put("/:rollNo", studentController.updateStudent);

// DELETE student
router.delete("/:rollNo", studentController.deleteStudent);

module.exports = router;
