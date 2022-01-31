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
  createAStudent,
  getAllStudent,
  searchStudent
} = require("../controller/StudentClientFunctions");

router.post("/registerStud", Register);
router.delete("/deleteStud", deleteStudent);
router.post("/updateStud", updateStudent);
router.get("/getOneStudent", getOneStudent);
router.post("/loginStud", Signin);
router.get("/protectedStud", requireStudLogin, protected);
router.get("/activate", createAStudent);
router.get("/getAllStudent", getAllStudent);
router.post("/searchStudent", searchStudent);
module.exports = router;
