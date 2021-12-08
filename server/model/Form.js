const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    Title: String,
    Description: String,
    File: {}
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
