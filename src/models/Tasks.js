const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {type: String, required: true},
    is_completed: {type: Boolean, required: true, default: false}
});

const Task = mongoose.model(taskSchema, "tasks");

module.exports = Task;
