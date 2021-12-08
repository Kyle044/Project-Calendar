const express = require("express");

const router = express.Router();

const {
  InsertRequest,
  getRequest,
  getCount,
  deleteRequest
} = require("../controller/RequestController");

router.post("/insertRequest", InsertRequest);
router.get("/getRequest", getRequest);
router.get("/getRequestCount", getCount);
router.delete("/deleteRequest", deleteRequest);
module.exports = router;
