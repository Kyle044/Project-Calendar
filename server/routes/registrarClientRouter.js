const express = require("express");
const requireLogin = require("../Middleware/registrarLogin");
const router = express.Router();

const {
  Register,
  Signin,
  protected,
  updateRegistrar,
  getOneRegistrar,
  deleteRegistrar
} = require("../controller/RegistrarClientFunctions");

router.post("/registerReg", Register);
router.post("/loginReg", Signin);
router.get("/protectedReg", requireLogin, protected);
router.post("/updateReg", updateRegistrar);
router.get("/getOneReg", getOneRegistrar);
router.delete("/deleteReg", deleteRegistrar);
module.exports = router;
