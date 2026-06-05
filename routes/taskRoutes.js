const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// CREATE TASK (protected)
router.post("/", auth, createTask);

// GET ALL TASKS (protected)
router.get("/", auth, getTasks);

// UPDATE TASK (protected)
router.put("/:id", auth, updateTask);

// DELETE TASK (protected)
router.delete("/:id", auth, deleteTask);

module.exports = router;