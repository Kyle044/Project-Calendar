let Appointment = require("../model/Appointment");
let Request = require("../model/Request");
let AppointmentTemplate = require("../model/AppointmentTemplate");
const moment = require("moment");
exports.insertAppointmentTemplate = (req, res) => {
  const { Name, Appointment } = req.body;
  var newTemplate = new AppointmentTemplate(req.body);
  newTemplate
    .save()
    .then(() => {
      res.json("Saved Successfully");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteAppointmentTemplate = (req, res) => {
  AppointmentTemplate.findByIdAndDelete(req.body.id)
    .then((at) => {
      res.json("success deleting the data");
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.getAppointmentTemplate = (req, res) => {
  AppointmentTemplate.find()
    .then((at) => {
      res.json(at);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.postAppointmentTemplate = (req, res) => {
  var aps = req.body.Appointment;
  var ctr = 0;
  aps.forEach((a) => {
    const d = new Date();
    d.setDate(d.getDate() + ((a.Date - d.getDay()) % 7) + 1);
    var newAppoint = new Appointment({
      Date: moment(d).format("YYYY-MM-DD"),
      Time: { From: a.From, To: a.To },
      Status: "Vacant"
    });
    newAppoint
      .save()
      .then(() => {})
      .catch((err) => {
        res.json(err);
      });
    ctr++;
    if (ctr === aps.length) {
      res.json("Success");
    }
  });
};

exports.editAppointMany = (req, res) => {
  Appointment.updateMany(
    { Date: req.body.From },
    { $set: { Date: req.body.To } }
  )
    .then(() => {
      res.json("success");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.rejectAppointMany = (req, res) => {
  Appointment.updateMany(
    { Date: req.body.From },
    { $set: { Status: "Rejected" } }
  )
    .then(() => {
      res.json("success");
    })
    .catch((err) => {
      res.json(err);
    });
};
