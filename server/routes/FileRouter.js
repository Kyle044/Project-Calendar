const express = require("express");

const router = express.Router();
const path = require("path");
const multer = require("multer");
const { InsertFile } = require("../controller/FileController");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  }
});

const upload = multer({
  storage: fileStorageEngine,
  limits: { fileSize: 1000000 }
});

router.post("/insertMultipleFile", upload.array("files", 12), InsertFile);

module.exports = router;
