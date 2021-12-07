let File = require("../model/File");
var _ = require("lodash");
exports.InsertFile = (req, res, next) => {
  var fileArray = [];
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

  res.json({
    msg: "Success",
    file: req.files,
    bool: true
  });
};

exports.deleteFile = (req, res, next) => {
  res.json("Deleted Successfully");
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
