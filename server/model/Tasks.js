const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    Subject: String,
    Description: String,
    startDate: String,
    dueDate: String,
    Handler: String,
    Status: String
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
