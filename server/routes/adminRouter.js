const express = require("express");
const requireLogin = require("../Middleware/requireLogin");
const router = express.Router();

const {
  Register,
  Signin,
  protected,
  updateAdmin,
  deleteAdmin,
  getOneAdmin
} = require("../controller/Auth");

router.post("/register", Register);
router.get("/protected", requireLogin, protected);
router.post("/login", Signin);
router.post("/updateAdmin", updateAdmin);
router.delete("/deleteAdmin", deleteAdmin);
router.get("/oneAdmin", getOneAdmin);
module.exports = router;
