const express = require("express");

const router = express.Router();

const {
  insertAppointmentTemplate,
  getAppointmentTemplate,
  deleteAppointmentTemplate,
  postAppointmentTemplate,
  editAppointMany,
  rejectAppointMany,
  deleteAppointMany
} = require("../controller/AppointmentTController");

router.post("/insertAppointmentTemplate", insertAppointmentTemplate);
router.get("/getAppointmentTemplate", getAppointmentTemplate);
router.delete("/deleteAppointmentTemplate", deleteAppointmentTemplate);
router.post("/postAppointmentTemplate", postAppointmentTemplate);
router.post("/editAppointMany", editAppointMany);
router.post("/RejectAppointMany", rejectAppointMany);

module.exports = router;
