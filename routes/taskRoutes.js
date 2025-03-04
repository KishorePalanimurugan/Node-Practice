const express = require("express");
const { createTask, getTasks, updateTask, deleteTask, getTaskById, getTasksByStatus } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/status", authMiddleware, getTasksByStatus);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.get("/:id", authMiddleware, getTaskById);

module.exports = router;
