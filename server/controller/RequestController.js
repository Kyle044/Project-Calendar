let Request = require("../model/Request");
var _ = require("lodash");
var fs = require("fs");
exports.InsertRequest = (req, res, next) => {
  const { sender, description, file, title } = req.body;
  const newReq = new Request({
    Sender: sender,
    Title: title,
    Description: description,
    File: file,
    Status: "Not Yet Started"
  });
  newReq
    .save()
    .then((req) => {
      res.json({ msg: "The request is sent successfully", requestInfo: req });
    })
    .catch((err) => {
      res
        .status(422)
        .json({ msg: "The request caught some error", error: err });
    });
};

exports.getRequest = (req, res, next) => {
  Request.find()
    .then((req) => {
      res.json({ msg: "request success!", data: req });
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
    });
};

exports.getCount = (req, res, next) => {
  Request.countDocuments()
    .then((count) => {
      res.json({ msg: "success request for count", data: count });
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
    });
};

exports.deleteRequest = (req, res, next) => {
  var error = false;

  Request.findByIdAndDelete(req.body.id)
    .then((reqs) => {
      _.forEach(reqs.File, (file) => {
        fs.unlink(file.path, (err) => {
          if (err) {
            error = true;
          }
        });
      });
      res.json({ msg: "Success deleting the request" });
    })
    .catch((err) => {
      res.status(422).json({ msg: "first The request is not in the database" });
    });
};
