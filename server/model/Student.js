const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    Email: String,
    Password: String,
    Fullname: String,
    SchoolIDNumber: String,
    Course: String,
    Year: String,
    Auth: { type: String, default: "student" }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
