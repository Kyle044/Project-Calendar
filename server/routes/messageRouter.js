const express = require("express");

const router = express.Router();

const { insertMessage } = require("../controller/MessageController");

router.post("/insertMessage", insertMessage);

module.exports = router;
