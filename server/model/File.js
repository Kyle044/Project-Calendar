const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    FileName: String,
    Directory: String,
    Size: Number
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);
module.exports = File;
