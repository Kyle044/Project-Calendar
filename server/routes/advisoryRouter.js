const express = require("express");

const router = express.Router();

const {
  InsertAdvisory,
  deleteAdvisory,
  getAdvisory,
  searchAdvisory
} = require("../controller/AdvisoryController");

router.post("/insertAdvisory", InsertAdvisory);
router.get("/getAdvisory", getAdvisory);
router.delete("/deleteAdvisory", deleteAdvisory);
router.post("/searchAdvisory", searchAdvisory);
module.exports = router;
