const express = require("express");

const router = express.Router();

const {
  InsertFile,
  getForm,
  deleteForm
} = require("../controller/formController");

router.post("/insertForm", InsertFile);
router.get("/getForm", getForm);
router.delete("/deleteForm", deleteForm);
module.exports = router;
