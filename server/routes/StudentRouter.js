const express = require("express");
const requireStudLogin = require("../Middleware/studentLogin");
const router = express.Router();

const {
  Register,
  deleteStudent,
  updateStudent,
  getOneStudent,
  Signin,
  protected,
  createAStudent
} = require("../controller/StudentClientFunctions");

router.post("/registerStud", Register);
router.delete("/deleteStud", deleteStudent);
router.post("/updateStud", updateStudent);
router.get("/getOneStudent", getOneStudent);
router.post("/loginStud", Signin);
router.get("/protectedStud", requireStudLogin, protected);
router.get("/activate", createAStudent);
module.exports = router;
