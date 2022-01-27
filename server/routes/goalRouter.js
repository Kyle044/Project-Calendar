const express = require("express");

const router = express.Router();

const {
  InsertGoal,
  getGoal,
  getCount,
  deleteGoal,
  searchGoal,
  markDone,
  deleteTask,
  editDescription,
  deleteFileAttachment,
  addFileAttachment,
  addTask,
  getHandler,
  findGoal,
  getFullHandler
} = require("../controller/GoalController");

router.post("/insertGoal", InsertGoal);
router.get("/getGoal", getGoal);
router.get("/getGoalCount", getCount);
router.delete("/deleteGoal", deleteGoal);
router.post("/searchGoal", searchGoal);
router.post("/markDone", markDone);
router.post("/editDescription", editDescription);
router.post("/deleteTask", deleteTask);
router.post("/deleteAttachment", deleteFileAttachment);
router.post("/addAttachment", addFileAttachment);
router.post("/addTask", addTask);
router.post("/getHandler", getHandler);
router.post("/findGoal", findGoal);

router.post("/oneHandler", getFullHandler);
module.exports = router;
