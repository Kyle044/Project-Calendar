const express = require("express");

const router = express.Router();

const {
  InsertRequest,
  getRequest,
  getCount
} = require("../controller/RequestController");

router.post("/insertRequest", InsertRequest);
router.get("/getRequest", getRequest);
router.get("/getRequestCount", getCount);
module.exports = router;
