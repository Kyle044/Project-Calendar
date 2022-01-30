const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const appointmentTemplateSchema = new Schema(
  {
    Name: String,
    Appointment: [{ Date: String, From: String, To: String }]
  },
  { timestamps: true }
);

const AppointmentTemplate = mongoose.model(
  "AppointmentTemplate",
  appointmentTemplateSchema
);
module.exports = AppointmentTemplate;
