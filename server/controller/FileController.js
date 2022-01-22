let File = require("../model/File");
var _ = require("lodash");

var fs = require("fs");
exports.InsertFile = (req, res, next) => {
  let fileArray = [];
  _.forEach(req.files, (value, key) => {
    const newFile = new File({
      FileName: value.filename,
      Directory: value.path,
      Size: value.size
    });
    newFile
      .save()
      .then((file) => {})
      .catch((err) => {
        res.json({
          msg: "Failed",
          error: "Error : " + err,
          bool: false
        });
        next();
      });
  });
  console.log(fileArray);
  res.json({
    msg: "Success",
    file: req.files,
    bool: true
  });
};

exports.deleteFile = (req, res, next) => {
  if (fs.existsSync(req.body.path.substr(16))) {
    //   fs.unlink(req.body.path, (err) => {
    //     if (err) {
    //       res.json("Deleted Unsuccessfully");
    //     }
    //     res.json("Deleted Successfully");
    //   });
    res.json("File exists");
  } else {
    res.json("File does not exists");
  }
};
exports.InsertSingleFile = (req, res, next) => {
  const newFile = new File({
    FileName: req.file.filename,
    Directory: req.file.path,
    Size: req.file.size
  });
  newFile
    .save()
    .then((file) => {})
    .catch((err) => {
      res.json({
        msg: "Failed",
        error: "Error : " + err,
        bool: false
      });
      next();
    });

  res.json({
    msg: "Success",
    file: req.file,
    bool: true
  });
};
