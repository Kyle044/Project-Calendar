let Appointment = require("../model/Appointment");

exports.insertAppointment = (req, res) => {
  const { Date, From, To } = req.body;
  var newAppointment = new Appointment({
    Date: Date,
    Time: {
      From: From,
      To: To
    },
    Status: "Vacant"
  });
  newAppointment
    .save()
    .then(() => {
      res.json("Saved Successfully");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getAppointments = (req, res) => {
  Appointment.find()
    .then((app) => {
      res.json(app);
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.deleteAppointment = (req, res) => {
  Appointment.findByIdAndDelete(req.body.id)
    .then((app) => {
      res.json(app);
    })
    .catch((err) => {
      res.json(err);
    });
};
