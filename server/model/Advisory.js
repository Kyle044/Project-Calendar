const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const advisorySchema = new Schema(
  {
    Subject: String,
    Description: String,
    Files: {
      FileName: String,
      Directory: String,
      Size: Number
    }
  },
  { timestamps: true }
);

const Advisory = mongoose.model("Advisory", advisorySchema);
module.exports = Advisory;
