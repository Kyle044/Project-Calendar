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
    .then((result) => {
      res.json({ msg: "Success getting advisory", data: result });
    })
    .catch((err) => {
      res.json({ msg: "There was an error", error: err });
    });
};

exports.InsertAdvisory = (req, res) => {
  var newAdvisory = new Advisory(req.body.data);

  newAdvisory
    .save()
    .then((data) => {
      res.json({ msg: "Success Insert", data: data });
    })
    .catch((err) => {
      res.json({ msg: "There is some error", error: err });
    });
};
