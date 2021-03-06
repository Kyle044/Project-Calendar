const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registrarSchema = new Schema(
  {
    Email: String,
    Password: String,
    Fullname: String,
    SchoolIDNumber: String,
    Tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    Auth: { type: String, default: "registrar" }
  },
  { timestamps: true }
);

const RegistrarClient = mongoose.model("RegistrarClient", registrarSchema);
module.exports = RegistrarClient;
