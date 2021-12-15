const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const advisorySchema = new Schema(
  {
    Description: String
  },
  { timestamps: true }
);

const Advisory = mongoose.model("Advisory", advisorySchema);
module.exports = Advisory;
