const Task = require("../models/taskSchema");



const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks." });
    }
};

const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const dupe = await Task.findOne({title});
        if (dupe) res.status(400).send({ message: "Task already exists" });
        const newTask = new Task({ title, description });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: "Failed to add task ." });
    }
};


const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({ message: "Task Deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete task" });
    }
};

const editTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description } = req.body;
    if (!title && !description) {
        return res.status(400).json({ error: "Title or description is required" });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId,
            { $set: { title, description } },
            { new: true }
        );
        if (!updatedTask) return res.status(400).json({ error: "Task not found" });
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}


module.exports = { addTask, getTasks, deleteTask, editTask }