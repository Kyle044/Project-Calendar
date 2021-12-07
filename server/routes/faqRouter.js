const express = require("express");

const router = express.Router();

const { insertFAQ, getFAQ } = require("../controller/FAQController");

router.post("/insertFAQ", insertFAQ);
router.get("/getFAQ", getFAQ);

module.exports = router;
