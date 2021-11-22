const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    Subject: String,
    Description: String,
    startDate: Date,
    dueDate: Date,
    Handler: String,
    Status: String
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
