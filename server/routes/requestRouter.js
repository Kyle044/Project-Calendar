const express = require("express");

const router = express.Router();

const {
  InsertRequest,
  getRequest,
  getCount,
  deleteRequest,
  markDone,
  emailReq,
  getUserRequest,
  Reject,
  searchRequest
} = require("../controller/RequestController");

router.post("/insertRequest", InsertRequest);
router.get("/getRequest", getRequest);
router.get("/getRequestCount", getCount);
router.delete("/deleteRequest", deleteRequest);
router.post("/markRequestDone", markDone);
router.post("/emailRequest", emailReq);
router.post("/getUserRequest", getUserRequest);
router.post("/rejectRequest", Reject);

router.post("/searchRequest", searchRequest);

module.exports = router;
