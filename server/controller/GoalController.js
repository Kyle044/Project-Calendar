let Goal = require("../model/Goal");
let Task = require("../model/Tasks");
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
    Owner
  } = req.body;
  const newTask = Tasks.map((task) => {
    const t = new Task(task);
    t.save();
    return t;
  });

  const newGoal = new Goal({
    Subject: Subject,
    Description: Description,
    StartDate: StartDate,
    DueDate: DueDate,
    Status: Status,
    Priority: Priority,
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
