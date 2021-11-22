const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = require("express").Router();
const mongoose = require("mongoose");
let Registrar = require("../model/RegistrarClientModel");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "You must be Logged In" });
  }
  const token = authorization.replace("Bearer", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      res.status(401).json({ error: "You Must Be Logged In" });
    }
    const { _id } = payload;
    Registrar.findById(_id).then((userdata) => {
      req.Registrar = userdata;

      next();
    });
  });
};
