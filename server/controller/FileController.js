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
