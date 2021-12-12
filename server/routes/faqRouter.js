const express = require("express");

const router = express.Router();

const { insertFAQ, getFAQ, deleteFAQ } = require("../controller/FAQController");

router.post("/insertFAQ", insertFAQ);
router.get("/getFAQ", getFAQ);
router.delete("/deleteFAQ", deleteFAQ);
module.exports = router;
