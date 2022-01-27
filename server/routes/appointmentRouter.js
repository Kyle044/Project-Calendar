const express = require("express");

const router = express.Router();

const {
  insertAppointment,
  getAppointments,
  deleteAppointment
} = require("../controller/appointmentController");

router.post("/insertAppointment", insertAppointment);
router.get("/getAppointment", getAppointments);
router.delete("/deleteAppointment", deleteAppointment);
module.exports = router;
