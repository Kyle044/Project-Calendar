let Message = require("../model/Message");

exports.insertMessage = (req, res) => {
  const { Title, File, Description, To, RequestID } = req.body;

  const newMessage = new Message(req.body);

  if (Title && Description && To && RequestID) {
    newMessage.save().then((mess) => {
      res.json({ msg: "Success", data: mess });
    });
  } else {
    res.status(400).json({ msg: "Error Fill up the fields" });
  }
};
