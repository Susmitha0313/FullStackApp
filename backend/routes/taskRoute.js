const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/taskController");

taskRouter.get("/", taskController.getTasks)
taskRouter.post("/addTask", taskController.addTask)
taskRouter.delete("/:taskId", taskController.deleteTask)
taskRouter.put("/:taskId", taskController.editTask)

module.exports = taskRouter;