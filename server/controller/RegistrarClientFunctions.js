const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../Middleware/requireLogin");
let Registrar = require("../model/RegistrarClientModel");
require("dotenv").config();

exports.Register = (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  const FullName = req.body.FullName;
  const schoolnum = req.body.schoolnum;

  if (!Email || !Password || !FullName || !schoolnum) {
    res.status(422).json({ msg: "Please Enter All Fields" });
  }
  Registrar.findOne({ Email: Email })
    .then((Registrar) => {
      if (Registrar) {
        res.json({ msg: "There is an Existing Account" });
      }
    })
    .catch((err) => res.status(400).json("The Error is : " + err));
  bcrypt.hash(Password, 12).then((hashedpassword) => {
    const newAdmin = new Registrar({
      Email,
      Password: hashedpassword,
      Fullname: FullName,
      SchoolIDNumber: schoolnum
    });
    newAdmin
      .save()
      .then((reg) => res.json({ msg: "Registrar Added", data: reg }))
      .catch((err) =>
        res.status(400).json({ msg: "Error Posting a Data : " + err })
      );
  });
};

exports.protected = (req, res) => {
  res.json(req.Registrar);
};

exports.Signin = (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  Registrar.findOne({ Email: Email })
    .then((reg) => {
      if (!reg) {
        res.status(402).json("Please Enter The Right Email");
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
exports.updateRegistrar = (req, res) => {
  const { Email, Password, Fullname, schoolnum, id } = req.body;
  if (!id) {
    res.status(402).json("Please Input The Registrar ID to Search");
  }
  Registrar.findById(id)
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

      admin
        .save()
        .then((ad) => {
          res.json({ msg: "Successfuly Updated", data: ad });
        })
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

exports.getOneRegistrar = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(402).json("Please Input The Registrar ID to Search");
  }

  Registrar.findOne({ _id: id })
    .then((reg) => {
      if (reg) {
        res.json({ msg: "Successfully Founded a Registrar", data: reg });
      } else {
        res.json({ msg: "Failed to find Registrar", data: null });
      }
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

exports.deleteRegistrar = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(402).json("Please Input The Admin ID to Search");
  }
  Registrar.findByIdAndDelete(id)
    .then((ad) => {
      res.json({
        msg: "An Registrar Account Was Successfully Deleted..",
        data: ad
      });
    })
    .catch((err) => res.status(400).json("Error : " + err));
};
