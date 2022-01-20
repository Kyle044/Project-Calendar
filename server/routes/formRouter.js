const express = require("express");

const router = express.Router();

const {
  InsertFile,
  getForm,
  deleteForm,
  searchForm
} = require("../controller/formController");

router.post("/insertForm", InsertFile);
router.get("/getForm", getForm);
router.delete("/deleteForm", deleteForm);

router.post("/searchForm", searchForm);
module.exports = router;
