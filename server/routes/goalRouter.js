const express = require("express");

const router = express.Router();

const {
  InsertGoal,
  getGoal,
  getCount,
  deleteGoal,
  searchGoal,
  markDone,
  deleteTask
} = require("../controller/GoalController");

router.post("/insertGoal", InsertGoal);
router.get("/getGoal", getGoal);
router.get("/getGoalCount", getCount);
router.delete("/deleteGoal", deleteGoal);
router.post("/searchGoal", searchGoal);
router.post("/markDone", markDone);
router.post("/deleteTask", deleteTask);
module.exports = router;
