const express = require("express");

const router = express.Router();

const { InsertGoal } = require("../controller/GoalController");

router.post("/insertGoal", InsertGoal);
module.exports = router;
