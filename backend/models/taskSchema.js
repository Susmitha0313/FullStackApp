const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now,
    },
    
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);