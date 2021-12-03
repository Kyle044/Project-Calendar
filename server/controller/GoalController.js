let Goal = require("../model/Goal");
let Task = require("../model/Tasks");
let File = require("../model/File");
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
    .then((goal) => {
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
