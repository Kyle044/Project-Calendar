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
