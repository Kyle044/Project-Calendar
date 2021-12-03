const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../Middleware/requireLogin");
let Student = require("../model/Student");
require("dotenv").config();

exports.Register = (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  const FullName = req.body.FullName;
  const schoolnum = req.body.schoolnum;
  const course = req.body.Course;
  const year = req.body.Year;

  if (!Email || !Password || !FullName || !schoolnum || !course || !year) {
    return res.status(422).json({ msg: "Please Enter All Fields" });
  } else {
    Student.findOne({ Email: Email })
      .then((Student) => {
        if (Student) {
          return res.json({ msg: "There is an Existing Account" });
        }
      })
      .catch((err) => {
        return res.status(400).json("The Error is : " + err);
      });

    bcrypt.hash(Password, 12).then((hashedpassword) => {
      const newAdmin = new Student({
        Email: Email,
        Password: hashedpassword,
        Fullname: FullName,
        SchoolIDNumber: schoolnum,
        Course: course,
        Year: year
      });
      newAdmin
        .save()
        .then((reg) => res.json({ msg: "Student Added", data: reg }))
        .catch((err) =>
          res.status(400).json({ msg: "Error Posting a Data : " + err })
        );
    });
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
  const { Email, Password, Fullname, schoolnum, id, Course, Year } = req.body;
  if (!id) {
    res.status(402).json("Please Input The Student ID to Search");
  }
  Student.findById(id)
    .then((admin) => {
      if (!Email) {
      } else {
        admin.Email = Email;
      }
      if (!Password) {
      } else {
        admin.Password = Password;
      }
      if (!Fullname) {
      } else {
        admin.Fullname = Fullname;
      }
      if (!schoolnum) {
      } else {
        admin.SchoolIDNumber = schoolnum;
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
      res.json({
        msg: "An Student Account Was Successfully Deleted..",
        data: ad
      });
    })
    .catch((err) => res.status(400).json("Error : " + err));
};
