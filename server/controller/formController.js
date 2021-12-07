let Form = require("../model/Form");
var _ = require("lodash");
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
