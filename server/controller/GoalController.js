let Goal = require("../model/Goal");
let Task = require("../model/Tasks");
let Admin = require("../model/Admin");
let File = require("../model/File");
let nodemailer = require("nodemailer");
async function smtpToRegistrar(from, sub) {
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
    to: "registrar044@gmail.com", // list of receivers
    subject: sub, // Subject line
    text: "", // plain text body
    html: `<div >
        <h4>From : ${from}</h4>
        <p>${sub}</p> <br />
      
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

exports.InsertGoal = (req, res) => {
  const {
    Subject,
    StartDate,
    Description,
    DueDate,
    Status,
    Priority,
    percentageComplete,
    Tasks,
    Owner,
    File
  } = req.body;
  const newTask = Tasks.map((task) => {
    const t = new Task(task);
    t.save();
    return t;
  });
  console.log(File);
  const newGoal = new Goal({
    Subject: Subject,
    Description: Description,
    StartDate: StartDate,
    DueDate: DueDate,
    Status: Status,
    Priority: Priority,
    Files: File,
    percentageComplete: percentageComplete,
    Owner: Owner,
    Tasks: newTask
  });

  newGoal
    .save()
    .then((goal) => {
      res.json({ msg: "A Goal was Added Successfully!", data: goal });
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

exports.getGoal = (req, res, next) => {
  Goal.find()
    .populate({ path: "Tasks", model: "Task" })
    .populate({ path: "Tasks", populate: { path: "Handler" } })
    .then((goal) => {
      goal.forEach((g) => {
        g.percentageComplete = Math.round(g.percentageComplete);
        console.log(g.percentageComplete);
      });
      // goal.percentageComplete = Math.round(goal.percentageComplete);

      res.json({ msg: "success get goal", data: goal });
    })
    .catch((err) =>
      res
        .status(402)
        .json({ msg: "there was an error getting goal", error: err })
    );
};

exports.getCount = (req, res, next) => {
  Goal.countDocuments()
    .then((count) => {
      res.json({ msg: "success request for count", data: count });
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
    });
};

exports.deleteGoal = (req, res, next) => {
  Goal.findByIdAndDelete(req.body.id)
    .then((data) => {
      data.Tasks.forEach((d) => {
        Task.findByIdAndDelete(d)
          .then(() => {
            console.log("gumana");
          })
          .catch((err) => {
            res.json(err);
          });
      });
    })
    .then(() => {
      res.json({ msg: "Successfull at Deleting Goal" });
    })
    .catch((err) => {
      res.json(TypeError);
    });
};

exports.searchGoal = (req, res, next) => {
  var regex = new RegExp(req.body.search, "i"); // 'i' makes it case insensitive
  Goal.find({ Subject: regex })
    .then((data) => {
      if (data.length == 0) {
        res.json({ msg: "No Data", data: data });
      } else {
        res.json({ msg: "Success for finding goal", data: data });
      }
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
    });
};

exports.markDone = (req, res, next) => {
  var counter = 0;
  req.body.goal.Tasks.forEach((t) => {
    counter++;
  });
  Goal.findById(req.body.goal._id)
    .then((goal) => {
      goal.percentageComplete += (1 / counter) * 100;
      if (Math.round(goal.percentageComplete) == 100) {
        goal.Status = "Complete";
      }
      goal
        .save()
        .then((g) => {})
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });

  Task.findById(req.body.task._id)
    .populate({ path: "Handler", model: "Admin" })
    .then((task) => {
      task.Status = "Complete";
      task
        .save()
        .then((t) => {
          smtpToRegistrar(
            t.Handler.Fullname,
            `Task ${t.Subject} is marked as done by ${t.Handler.Fullname}`
          );

          res.json("Successfully Marked as Done");
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteTask = (req, res, next) => {
  const { task, goal } = req.body;
  Goal.findOneAndUpdate(
    { _id: goal._id },
    {
      $pull: {
        Tasks: task._id
      }
    },
    { safe: true }
  )
    .then((goal) => {
      Task.findByIdAndDelete(task._id)
        .then((task) => {
          res.json("Success!");
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.editDescription = (req, res) => {
  Goal.findById(req.body.id)
    .then((goal) => {
      goal.Description = req.body.description;
      goal
        .save()
        .then((g) => {
          res.json("Successfully Updated");
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteFileAttachment = (req, res) => {
  Goal.findOneAndUpdate(
    { _id: req.body.id },
    {
      $pull: {
        Files: { _id: req.body.file }
      }
    },
    { safe: true }
  )
    .then((goal) => {
      res.json("Success!");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.addFileAttachment = (req, res) => {
  Goal.findById(req.body.id)
    .then((goal) => {
      req.body.file.forEach((f) => {
        goal.Files.push(f);
      });
      goal.save().then(() => {
        res.json("Success");
      });
    })
    .catch((err) => {
      res.json(err);
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.addTask = (req, res) => {
  const { Subject, Description, StartDate, DueDate } = req.body.data;
  const { id } = req.body;
  const newTask = new Task({
    Subject: Subject,
    Description: Description,
    startDate: StartDate,
    dueDate: DueDate,
    Handler: "N/A",
    Status: "On Going"
  });
  newTask
    .save()
    .then((task) => {
      Goal.findById(id)
        .then((goal) => {
          goal.Tasks.push(task._id);

          goal
            .save()
            .then((goal) => {
              res.json("Success");
            })
            .catch((err) => {
              res.json(err);
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

exports.getHandler = (req, res) => {
  Task.find({ Handler: req.body.id })
    .populate("Handler")
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(task);
    });
};

exports.findGoal = (req, res) => {
  Goal.findOne({ Tasks: req.body.id })
    .then((goal) => {
      res.json({ task: req.body.task, goal: goal });
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.getFullHandler = (req, res) => {
  Admin.findById(req.body.id)
    .then((ad) => {
      res.json(ad);
    })
    .catch((err) => {
      res.json(err);
    });
};
