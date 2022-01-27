const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    Subject: String,
    Description: String,
    StartDate: String,
    DueDate: String,
    Status: String,
    Priority: String,
    percentageComplete: Number,
    Files: [
      {
        FileName: String,
        Directory: String,
        Size: Number
      }
    ],
    Tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    Owner: String
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
