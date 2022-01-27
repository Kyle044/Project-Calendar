const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
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
const adminRouter = require("./routes/adminRouter");
const registrarRouter = require("./routes/registrarClientRouter");
const studentRouter = require("./routes/StudentRouter");
const goalRouter = require("./routes/goalRouter");
const fileRouter = require("./routes/FileRouter");
const reqRouter = require("./routes/requestRouter");
const messRouter = require("./routes/messageRouter");
const faqRouter = require("./routes/faqRouter");
const formRouter = require("./routes/formRouter");
const advisoryRouter = require("./routes/advisoryRouter");
const appointmentRouter = require("./routes/appointmentRouter");
app.use("/api", formRouter);
app.use("/api", adminRouter);
app.use("/api", studentRouter);
app.use("/api", registrarRouter);
app.use("/api", goalRouter);
app.use("/api", fileRouter);
app.use("/api", reqRouter);
app.use("/api", messRouter);
app.use("/api", faqRouter);
app.use("/api", advisoryRouter);
app.use("/api", appointmentRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log("Server Runs on Port : " + port);
});
