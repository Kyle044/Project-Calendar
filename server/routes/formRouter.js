const express = require("express");

const router = express.Router();

const { InsertFile, getForm } = require("../controller/formController");

router.post("/insertForm", InsertFile);
router.get("/getForm", getForm);
module.exports = router;
