const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reqSchema = new Schema(
  {
    Sender: {},
    Title: [],
    Appointment: { type: Schema.Types.ObjectId, ref: "Appointment" },
    Program: String,
    Description: String,
    File: [{}],
    Status: String
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", reqSchema);
module.exports = Request;
