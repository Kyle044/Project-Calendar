const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reqSchema = new Schema(
  {
    Sender: {},
    Title: String,
    Description: String,
    File: [{}],
    Status: String
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", reqSchema);
module.exports = Request;
