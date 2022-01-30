let Request = require("../model/Request");
let Appointment = require("../model/Appointment");
var _ = require("lodash");
var fs = require("fs");
var nodemailer = require("nodemailer");

async function smtp(to, sub, mes, files) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "eccjournal560@gmail.com", // generated ethereal user
      pass: "thesis123" // generated ethereal password
    }
  });

  var optionsWithAttachment = {
    from: '"ECC Registrar👻" <eccjournal560@gmail.com>', // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: mes, // plain text body
    html: `<h1>${mes}</h1>`, // html body
    attachments: files
  };

  var option = {
    from: '"ECC Registrar👻" <eccjournal560@gmail.com>', // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: mes, // plain text body
    html: `<h1>${mes}</h1>` // html body
  };
  let info;
  // send mail with defined transport object
  if (files) {
    info = await transporter.sendMail(optionsWithAttachment);
  } else {
    info = await transporter.sendMail(option);
  }

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

async function smtpToRegistrar(to, from, sub, mes, program) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "eccjournal560@gmail.com", // generated ethereal user
      pass: "thesis123" // generated ethereal password
    }
  });

  var option = {
    from: from, // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: mes, // plain text body
    html: `<div >
        <h4>From : ${from}</h4>
        <p>${mes}</p> <br />
        <h4>Graduate program : ${program}</h4>
            </div>` // html body
  };
  let info;
  // send mail with defined transport object
  info = await transporter.sendMail(option);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.InsertRequest = (req, res, next) => {
  const { sender, description, file, title, program, appointment } = req.body;

  Appointment.findById(appointment._id)
    .then((app) => {
      app.Status = "Booked by " + sender.Fullname;
      app
        .save()
        .then(() => {
          const newReq = new Request({
            Sender: sender,
            Title: title,
            Description: description,
            Program: program,
            File: file,
            Appointment: appointment,
            Status: "On Going"
          });
          newReq
            .save()
            .then((req) => {
              smtpToRegistrar(
                "registrar044@gmail.com",
                sender.Email,
                "Requesting for : " +
                  title.map((t) => {
                    return t;
                  }) +
                  " , ",
                description,
                program
              );

              res.json({
                msg: "The request is sent successfully",
                requestInfo: req
              });
            })
            .catch((err) => {
              res
                .status(422)
                .json({ msg: "The request caught some error", error: err });
            });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getRequest = (req, res, next) => {
  Request.find()
    .populate({ path: "Appointment", model: "Appointment" })
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

  Request.findById(req.body.id)
    .then((request) => {
      Appointment.findByIdAndDelete(request.Appointment)
        .then((data) => {
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
              res
                .status(422)
                .json({ msg: "first The request is not in the database" });
            });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.markDone = (req, res) => {
  console.log(req.body.id);

  const { id } = req.body;

  Request.findById(id)
    .then((request) => {
      request.Status = "Done";
      request.save();
      res.json("Success");
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.emailReq = (req, res) => {
  var files = [];
  req.body.formData.forEach((f) => {
    files.push({
      filename: f.filename,
      path: f.path
    });
  });
  console.log(files);
  const { data, Sender } = req.body;
  if (files.length > 0) {
    smtp(Sender.Email, data.Subject, data.Message, files).catch(console.error);
  } else {
    smtp(Sender.Email, data.Subject, data.Message).catch(console.error);
  }
};

exports.getUserRequest = (req, res) => {
  const { id } = req.body;

  Request.find({ "Sender._id": id })
    .populate({ path: "Appointment", model: "Appointment" })
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.Reject = (req, res) => {
  console.log(req.body.id);

  const { id } = req.body;

  Request.findById(id)
    .then((request) => {
      request.Status = "Rejected";
      request.save();
      res.json("Success");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.searchRequest = (req, res, next) => {
  var regex = new RegExp(req.body.search, "i"); // 'i' makes it case insensitive
  Request.find({ "Sender.SchoolIDNumber": regex })
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
