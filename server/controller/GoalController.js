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
    .populate({ path: "Tasks", model: "Task" })
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
      res.json({ msg: "Success for deleting the goal", data: data });
    })
    .catch((err) => {
      res.status(422).json({ msg: "There was an error", error: err });
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
    .then((task) => {
      task.Status = "Complete";
      task
        .save()
        .then((t) => {
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
      res.json("Success!");
    })
    .catch((err) => {
      res.json(err);
    });
};
