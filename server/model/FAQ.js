const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const faqSchema = new Schema(
  {
    Question: String,
    Answer: String
  },
  { timestamps: true }
);

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;
