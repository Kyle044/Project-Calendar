const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    Email: String,
    Password: String,
    Fullname: String,
    SchoolIDNumber: String,
    Auth: { type: String, default: "admin" }
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
