const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../Middleware/requireLogin");
let Admin = require("../model/Admin");
require("dotenv").config();

exports.Register = (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  const FullName = req.body.FullName;
  const schoolnum = req.body.SchoolIDNumber;

  if (!Email || !Password || !FullName || !schoolnum) {
    res.status(422).json({ msg: "Please Enter All Fields" });
  }
  Admin.findOne({ Email: Email })
    .then((Admin) => {
      if (Admin) {
        res.json({ msg: "There is an Existing Account" });
      }
    })
    .catch((err) => res.status(400).json("The Error is : " + err));
  bcrypt.hash(Password, 12).then((hashedpassword) => {
    const newAdmin = new Admin({
      Email,
      Password: hashedpassword,
      Fullname: FullName,
      SchoolIDNumber: schoolnum
    });
    newAdmin
      .save()
      .then((admin) => res.json({ msg: "Admin Added", data: admin }))
      .catch((err) =>
        res.status(400).json({ msg: "Error Posting a Data : " + err })
      );
  });
};

exports.protected = (req, res) => {
  res.json(req.Admin);
};

exports.Signin = (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  Admin.findOne({ Email: Email })
    .then((Admin) => {
      if (!Admin) {
        res.status(402).json("Please Enter The Right Email");
      }
      bcrypt
        .compare(Password, Admin.Password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: Admin._id }, process.env.JWT_SECRET);
            res.json({ token });
          } else {
            return res.status(422).json("Invalid Email or Password");
          }
        })
        .catch((err) => console.log("There is an Error Signing in : " + err));
    })
    .catch((err) => res.status(400).json("The Error is : " + err));
};
exports.updateAdmin = (req, res) => {
  const { Email, Password, FullName, SchoolIDNumber, id } = req.body;
  bcrypt.hash(Password, 12).then((hashedpassword) => {
    if (!id) {
      res.status(402).json("Please Input The Admin ID to Search");
    }
    Admin.findById(id)
      .then((admin) => {
        if (!Email) {
        } else {
          admin.Email = Email;
        }
        if (!Password) {
        } else {
          admin.Password = hashedpassword;
        }
        if (!FullName) {
        } else {
          admin.Fullname = FullName;
        }
        if (!SchoolIDNumber) {
        } else {
          admin.SchoolIDNumber = SchoolIDNumber;
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

exports.getOneAdmin = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(402).json("Please Input The Admin ID to Search");
  }

  Admin.findOne({ _id: id })
    .then((admin) => {
      if (admin) {
        res.json({ msg: "Successfully Founded a Admin", data: admin });
      } else {
        res.json({ msg: "Failed to find Admin", data: null });
      }
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

exports.deleteAdmin = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(402).json("Please Input The Admin ID to Search");
  }
  Admin.findByIdAndDelete(id)
    .then((ad) => {
      res.json({
        msg: "An Admin Account Was Successfully Deleted..",
        data: ad
      });
    })
    .catch((err) => res.status(400).json("Error : " + err));
};
