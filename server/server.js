const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.URI;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database is Running"))
  .catch((err) => console.log("The Error is " + err));
const adminRouter = require("./routes/AdminRouter");
const registrarRouter = require("./routes/registrarClientRouter");
const studentRouter = require("./routes/StudentRouter");
const goalRouter = require("./routes/goalRouter");
const fileRouter = require("./routes/FileRouter");
const reqRouter = require("./routes/requestRouter");
const messRouter = require("./routes/messageRouter");
const faqRouter = require("./routes/faqRouter");
const formRouter = require("./routes/formRouter");
app.use("/api", formRouter);
app.use("/api", adminRouter);
app.use("/api", studentRouter);
app.use("/api", registrarRouter);
app.use("/api", goalRouter);
app.use("/api", fileRouter);
app.use("/api", reqRouter);
app.use("/api", messRouter);
app.use("/api", faqRouter);

app.listen(port, () => {
  console.log("Server Runs on Port : " + port);
});
