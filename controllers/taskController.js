const Task = require("../modules/Task");

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = new Task({
            user: req.user.id,
            title,
            description,
            dueDate,
            status,
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await task.deleteOne();
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTasksByStatus = async (req, res) => {
    try {
        const { status } = req.query;

        console.log("Query status:", status); 

        let filter = {};

        if (status) {
            filter.status = status; 
        }

        console.log("Applied filter:", filter); 

        const tasks = await Task.find(filter);
        console.log("Filtered Tasks:", tasks);

        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error.message, error.stack); // Log full error details
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


