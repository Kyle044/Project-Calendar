let FAQ = require("../model/FAQ");

exports.insertFAQ = (req, res) => {
  const newFaq = new FAQ(req.body);
  newFaq
    .save()
    .then((faq) => {
      res.json({ msg: "Successfully Inserted", data: faq });
    })
    .catch((err) => {
      res.json({ msg: "There was an error", error: err });
    });
};
exports.getFAQ = (req, res) => {
  FAQ.find()
    .then((result) => {
      res.json({ msg: "Sucess getting faq", data: result });
    })
    .catch((err) => {
      res.json({ msg: "There was an error", error: err });
    });
};
exports.deleteFAQ = (req, res) => {
  FAQ.findByIdAndDelete(req.body.id)
    .then((result) => {
      res.json({ msg: "Success deleting faq", data: result });
    })
    .catch((err) => {
      res.json({ msg: "There was an error", error: err });
    });
};

exports.searchFAQ = (req, res, next) => {
  var regex = new RegExp(req.body.search, "i"); // 'i' makes it case insensitive
  FAQ.find({ Question: regex })
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
