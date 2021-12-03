const express = require("express");

const router = express.Router();

const {
  InsertGoal,
  getGoal,
  getCount
} = require("../controller/GoalController");

router.post("/insertGoal", InsertGoal);
router.get("/getGoal", getGoal);
router.get("/getGoalCount", getCount);
module.exports = router;
