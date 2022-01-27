let Advisory = require("../model/Advisory");

exports.deleteAdvisory = (req, res) => {
  Advisory.findByIdAndDelete(req.body.id)
    .then((result) => {
      res.json({ msg: "Success deleting Advisory", data: result });
    })
    .catch((err) => {
      res.json({ msg: "There was an error", error: err });
    });
};

exports.getAdvisory = (req, res) => {
  Advisory.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json({ msg: "Success getting advisory", data: result });
    })
    .catch((err) => {
      res.json({ msg: "There was an error", error: err });
    });
};

exports.InsertAdvisory = (req, res) => {
  var newAdvisory = new Advisory(req.body);

  newAdvisory
    .save()
    .then((data) => {
      res.json({ msg: "Success Insert", data: data });
    })
    .catch((err) => {
      res.json({ msg: "There is some error", error: err });
    });
};
exports.searchAdvisory = (req, res, next) => {
  var regex = new RegExp(req.body.search, "i"); // 'i' makes it case insensitive
  Advisory.find({ Subject: regex })
    .then((data) => {
      if (data.length == 0) {
        res.json({ msg: "No Data", data: data });
      } else {
        res.json({ msg: "Success for finding advisory", data: data });
      }
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
    });
};
