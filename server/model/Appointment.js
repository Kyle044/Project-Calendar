const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const appointmentSchema = new Schema(
  {
    Date: String,
    Time: {
      From: String,
      To: String
    },
    Status: String
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
