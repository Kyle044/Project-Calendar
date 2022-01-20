let Form = require("../model/Form");
var _ = require("lodash");
var fs = require("fs");

exports.InsertFile = (req, res, next) => {
  const newForm = new Form(req.body);

  newForm
    .save()
    .then((data) => {
      res.json({ msg: "Successfully Inserted", data: data });
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
    });
};
exports.getForm = (req, res, next) => {
  Form.find()
    .then((result) => {
      res.json({ msg: "Success Getting Data", data: result });
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
    });
};

exports.deleteForm = (req, res, next) => {
  Form.findByIdAndDelete(req.body.id)
    .then((result) => {
      fs.unlink(result.File.destination + "/" + result.File.filename, (err) => {
        if (err) {
          res.json({ msg: "Failed Deleting Data", data: result });
        } else {
          res.json({ msg: "Success Deleting Data", data: result });
        }
      });

      // res.json({ msg: "Success Deleting Data", data: result });
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
    });
};
exports.searchForm = (req, res, next) => {
  var regex = new RegExp(req.body.search, "i"); // 'i' makes it case insensitive
  Form.find({ Description: regex })
    .then((data) => {
      if (data.length == 0) {
        res.json({ msg: "No Data", data: data });
      } else {
        res.json({ msg: "Success for finding form", data: data });
      }
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
    });
};
