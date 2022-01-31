const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const requireLogin = require("../Middleware/requireLogin");
let Student = require("../model/Student");
var nodemailer = require("nodemailer");
require("dotenv").config();

async function smtp(to, sub, token) {
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
    from: '"ECC Registrar👻" <eccjournal560@gmail.com>', // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: token, // plain text body
    html: `<h2>Please click on given link to activate your account</h2>
    <p>${process.env.CLIENT_URL}/activate?token=${token}</p>` // html body
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

exports.Register = (req, res) => {
  console.log(req.body);
  const Email = req.body.Email;
  const Password = req.body.Password;
  const FullName = req.body.FullName;
  const schoolnum = req.body.schoolnum;
  const course = req.body.Course;
  const Year = req.body.Year;
  var isAlreadyinDB = false;
  if (!Email || !Password || !FullName || !schoolnum || !course || !Year) {
    return res.json("Please fill up all the fields");
  } else {
    Student.findOne({ $or: [{ Email: Email }, { SchoolIDNumber: schoolnum }] })
      .then((Student) => {
        if (Student) {
          return res.json("Already in database");
        } else {
          const token = jwt.sign(
            { Email, Password, FullName, schoolnum, course, Year },
            process.env.JWT_ACC_ACTIVATE,
            { expiresIn: "20m" }
          );
          smtp(Email, "Account Activation", token).catch(() => {
            res.json("Email is invalid");
          });

          return res.json("Email has been sent, kindly activate your account.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.createAStudent = (req, res) => {
  const { token } = req.query;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACC_ACTIVATE,
      function (err, decodedToken) {
        if (err) {
          return res.sendFile(__dirname + "/serverResponse/serverError.html");
        }
        const { Email, Password, FullName, schoolnum, course, Year } =
          decodedToken;

        Student.find({ $or: [{ Email: Email }, { SchoolIDNumber: schoolnum }] })
          .then((stud) => {
            if (stud.length) {
              console.log("There is a student na");
              return res.sendFile(
                __dirname + "/serverResponse/serverError.html"
              );
            } else {
              bcrypt.hash(Password, 12).then((hashedpassword) => {
                const newStudent = new Student({
                  Email: Email,
                  Password: hashedpassword,
                  Fullname: FullName,
                  SchoolIDNumber: schoolnum,
                  Course: course,
                  Year: Year
                });
                newStudent
                  .save()
                  .then((data) => {
                    console.log(data);
                    res.sendFile(__dirname + "/serverResponse/server.html");
                  })
                  .catch((err) => {
                    console.log("Error");
                    res.sendFile(
                      __dirname + "/serverResponse/serverError.html"
                    );
                  });
              });
            }
          })
          .catch((err) => {
            return res.sendFile(__dirname + "/serverResponse/serverError.html");
          });
      }
    );
  } else {
    return res.sendFile(__dirname + "/serverResponse/serverError.html");
  }
};

exports.protected = (req, res) => {
  res.json(req.Student);
};

exports.Signin = (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  Student.findOne({ Email: Email })
    .then((reg) => {
      if (!reg) {
        return res.status(402).json("Please Enter The Right Email");
      }
      bcrypt
        .compare(Password, reg.Password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: reg._id }, process.env.JWT_SECRET);
            res.json({ token });
          } else {
            return res.status(422).json("Invalid Email or Password");
          }
        })
        .catch((err) => console.log("There is an Error Signing in : " + err));
    })
    .catch((err) => res.status(400).json("The Error is : " + err));
};
exports.updateStudent = (req, res) => {
  const { Email, Password, Fullname, SchoolIDNumber, id, Course, Year } =
    req.body;
  if (!id) {
    res.status(402).json("Please Input The Student ID to Search");
  }

  bcrypt.hash(Password, 12).then((hashedpassword) => {
    Student.findById(id)
      .then((admin) => {
        if (!Email) {
        } else {
          admin.Email = Email;
        }
        if (!Password) {
        } else {
          admin.Password = hashedpassword;
        }
        if (!Fullname) {
        } else {
          admin.Fullname = Fullname;
        }
        if (!SchoolIDNumber) {
        } else {
          admin.SchoolIDNumber = SchoolIDNumber;
        }
        if (!Course) {
        } else {
          admin.Course = Course;
        }
        if (!Year) {
        } else {
          admin.Year = Year;
        }
        admin
          .save()
          .then((ad) => {
            res.json({ msg: "Successfuly Updated", data: ad });
          })
          .catch((err) => res.status(400).json("Error : " + err));
      })
      .catch((err) => res.status(400).json("Error : " + err));
  });
};

exports.getOneStudent = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(402).json("Please Input The Student ID to Search");
  }

  Student.findOne({ _id: id })
    .then((reg) => {
      if (reg) {
        res.json({ msg: "Successfully Founded a Student", data: reg });
      } else {
        res.json({ msg: "Failed to find Student", data: null });
      }
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

exports.deleteStudent = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(402).json("Please Input The Admin ID to Search");
  }
  Student.findByIdAndDelete(id)
    .then((ad) => {
      res.json("An Student Account Was Successfully Deleted..");
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

exports.getAllStudent = (req, res) => {
  Student.find()
    .then((stud) => {
      res.json(stud);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.searchStudent = (req, res, next) => {
  var regex = new RegExp(req.body.search, "i"); // 'i' makes it case insensitive

  Student.find({
    $or: [
      { Email: regex },
      { Fullname: regex },
      { SchoolIDNumber: regex },
      { Course: regex },
      { Year: regex }
    ]
  })
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
