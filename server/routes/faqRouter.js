const express = require("express");

const router = express.Router();

const {
  insertFAQ,
  getFAQ,
  deleteFAQ,
  searchFAQ
} = require("../controller/FAQController");

router.post("/insertFAQ", insertFAQ);
router.get("/getFAQ", getFAQ);
router.delete("/deleteFAQ", deleteFAQ);
router.post("/searchFAQ", searchFAQ);
module.exports = router;
