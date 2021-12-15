const express = require("express");

const router = express.Router();

const {
  InsertAdvisory,
  deleteAdvisory,
  getAdvisory
} = require("../controller/AdvisoryController");

router.post("/insertAdvisory", InsertAdvisory);
router.get("/getAdvisory", getAdvisory);
router.delete("/deleteAdvisory", deleteAdvisory);
module.exports = router;
