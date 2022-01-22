import React, { useState, useEffect } from "react";
import "./home.css";
import { Modal } from "antd";
import download from "../../../Functions/download";
import axios from "axios";
import {
  Progress,
  Drawer,
  Button,
  Badge,
  Divider,
  Popconfirm,
  notification
} from "antd";
import moment from "moment";
function Card({ goal, setGoal, setGoalCount }) {
  const [toggle, setToggle] = useState({
    task: false,
    description: false,
    attachment: false
  });
  const [description, setDescription] = useState(goal.Description);
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Successfully Deleted The Goal",
      description: "The goal cannot be retrieved"
    });
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleMark = (t) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/markDone`, { goal: goal, task: t })
      .then((res) => {
        console.log(res.data);
        axios.get(`${process.env.REACT_APP_KEY}/getGoal`).then((res) => {
          setGoal(res.data.data);
          axios
            .get(`${process.env.REACT_APP_KEY}/getGoalCount`)
            .then((res) => {
              setGoalCount(res.data.data);
            })
            .catch((err) => {
              console.log("There was an error : " + err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(t);
  };
  const confirmDelete = (data) => {
    axios
      .delete(`${process.env.REACT_APP_KEY}/deleteGoal`, { data: { id: data } })
      .then((res) => {
        axios.get(`${process.env.REACT_APP_KEY}/getGoal`).then((res) => {
          setGoal(res.data.data);
          axios
            .get(`${process.env.REACT_APP_KEY}/getGoalCount`)
            .then((res) => {
              setGoalCount(res.data.data);
            })
            .catch((err) => {
              console.log("There was an error : " + err);
            });
        });
        openNotificationWithIcon("success");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(data);
  };

  const colorCode = {
    red: "#ff5c58",
    green: "green",
    blue: "lightblue",
    darkblue: "darkblue",
    darkred: "darkred",
    darkgreen: "white"
  };
  const getGoal = () => {
    axios.get(`${process.env.REACT_APP_KEY}/getGoal`).then((res) => {
      setGoal(res.data.data);
      axios
        .get(`${process.env.REACT_APP_KEY}/getGoalCount`)
        .then((res) => {
          setGoalCount(res.data.data);
        })
        .catch((err) => {
          console.log("There was an error : " + err);
        });
    });
  };
  const handleDelete = (t) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/deleteTask`, { goal: goal, task: t })
      .then((res) => {
        axios.get(`${process.env.REACT_APP_KEY}/getGoal`).then((res) => {
          setGoal(res.data.data);
          axios
            .get(`${process.env.REACT_APP_KEY}/getGoalCount`)
            .then((res) => {
              setGoalCount(res.data.data);
            })
            .catch((err) => {
              console.log("There was an error : " + err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddTask = () => {
    setToggle({ task: true, description: false, attachment: false });
  };

  const handleEditDescription = () => {
    setToggle({ task: false, description: true, attachment: false });
  };

  const handleEditAttachment = () => {
    setToggle({ task: false, description: false, attachment: true });
  };

  const handleCancelTask = () => {
    setToggle({ task: false, description: false, attachment: false });
  };

  const handleOkDescription = () => {
    if (description) {
      axios
        .post(`${process.env.REACT_APP_KEY}/editDescription`, {
          id: goal._id,
          description: description
        })
        .then((res) => {
          alert(res.data);
          getGoal();
          setToggle({ task: false, description: false, attachment: false });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("Please fill up the description");
    }
  };

  const handleCancelDescription = () => {
    setToggle({ task: false, description: false, attachment: false });
  };

  const handleOkAttachment = () => {
    setToggle({ task: false, description: false, attachment: false });
  };

  const handleCancelAttachment = () => {
    setToggle({ task: false, description: false, attachment: false });
  };

  const handleDeleteFile = (id) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/deleteAttachment`, {
        id: goal._id,
        file: id
      })
      .then((res) => {
        alert(res.data);
        getGoal();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(id);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  const handleAddAttachment = () => {
    const formData = new FormData();
    if (file.length != 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append("files", file[i]);
      }
    }
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_KEY}/insertMultipleFile`,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formData
    };
    axios(config)
      .then((res) => {
        const files = res.data.file.map((file) => {
          return {
            FileName: file.filename,
            Directory: file.path,
            Size: file.size
          };
        });
        axios
          .post(`${process.env.REACT_APP_KEY}/addAttachment`, {
            id: goal._id,
            file: files
          })
          .then((res) => {
            getGoal();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [wask, setWask] = useState({
    Subject: "",
    Description: "",
    StartDate: "",
    DueDate: ""
  });

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setWask((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleOkTask = () => {
    if (wask.Description && wask.Subject && wask.DueDate && wask.StartDate) {
      axios
        .post(`${process.env.REACT_APP_KEY}/addTask`, {
          id: goal._id,
          data: wask
        })
        .then((res) => {
          console.log(res.data);
          alert("Successfull");
          getGoal();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill up all the fields");
    }
  };
  return (
    <Badge.Ribbon
      text={
        goal.percentageComplete > 0 && goal.percentageComplete < 100
          ? "On Going"
          : goal.percentageComplete == 100
          ? "Complete"
          : goal.percentageComplete == 0
          ? "Unbegun"
          : null
      }
      color={
        goal.percentageComplete > 0 && goal.percentageComplete < 100
          ? colorCode.blue
          : goal.percentageComplete == 100
          ? colorCode.green
          : goal.percentageComplete == 0
          ? colorCode.red
          : null
      }
    >
      <div
        className="Card"
        style={{
          backgroundColor:
            goal.percentageComplete > 0 && goal.percentageComplete < 100
              ? colorCode.blue
              : goal.percentageComplete == 100
              ? colorCode.green
              : goal.percentageComplete == 0
              ? colorCode.red
              : null,
          color:
            goal.percentageComplete > 0 && goal.percentageComplete < 100
              ? "black"
              : "white"
        }}
      >
        <p className="date">{moment(goal.createdAt).format("MMMM DD YYYY")}</p>
        <div className="contentCard">
          <h4
            style={{
              color:
                goal.percentageComplete > 0 && goal.percentageComplete < 100
                  ? colorCode.darkblue
                  : goal.percentageComplete == 100
                  ? colorCode.darkgreen
                  : colorCode.darkred
            }}
          >
            {goal.Subject}
          </h4>
          <p>
            {goal.Description.length > 10
              ? `${goal.Description.substr(0, 18)} ...`
              : goal.Description}
          </p>
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068"
            }}
            percent={goal.percentageComplete}
          />
        </div>
        <div className="cardBtn">
          <Button
            onClick={() => {
              showDrawer();
            }}
          >
            Preview
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              confirmDelete(goal._id);
            }}
            onCancel={() => {
              console.log("the goal is not deleted");
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
        <Drawer
          title={goal.Subject}
          placement="right"
          onClose={onClose}
          visible={visible}
          width={390}
        >
          <div className="descriptContainer">
            <div className="flexCont">
              <h4 className="white w ">Description</h4>
              <i
                class="far fa-edit anim"
                onClick={() => {
                  handleEditDescription();
                }}
              ></i>
            </div>
            <p className="white">{goal.Description}</p>
          </div>

          <div className="descriptContainer">
            <div className="flexCont">
              <h4 className="white w ">Attachments</h4>
              <i
                class="far fa-edit anim"
                onClick={() => {
                  handleEditAttachment();
                }}
              ></i>
            </div>
            {goal.Files.map((form) => {
              return (
                <Button
                  onClick={() => {
                    download(
                      form.Directory.substr(14),
                      form.FileName.substr(15)
                    );
                  }}
                >
                  {form.FileName}
                </Button>
              );
            })}
          </div>

          <div className="flexConts">
            <h4 className="w ">Tasks</h4>
            <i
              class="fas fa-plus-square anima"
              onClick={() => {
                handleAddTask();
              }}
            ></i>
          </div>

          {goal.Tasks.map((t) => {
            return (
              <div>
                <Divider orientation="left">
                  <h4 className={t.Status == "Complete" ? "complete" : null}>
                    {t.Subject}
                  </h4>
                </Divider>
                <p>{t.Description}</p>
                {t.Status != "Complete" ? (
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleMark(t);
                      }}
                    >
                      Mark as Done
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(t);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <p className="complete">Complete</p>
                )}
              </div>
            );
          })}
        </Drawer>
      </div>

      <Modal
        title="Description"
        visible={toggle.description}
        onOk={handleOkDescription}
        onCancel={handleCancelDescription}
      >
        <div action="" className="formzskie">
          <label>Edit Description</label>

          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </Modal>

      <Modal
        title="Attachment"
        visible={toggle.attachment}
        onOk={handleOkAttachment}
        onCancel={handleCancelAttachment}
      >
        <div className="wataContainer">
          <label>Add Attachment</label>
          <input type="file" multiple onChange={handleFileChange} />
          <Button
            onClick={() => {
              handleAddAttachment();
            }}
          >
            Add
          </Button>
        </div>
        {goal.Files.map((file) => {
          return (
            <div className="wataeContainer">
              <h4>{file.FileName}</h4>
              <Button
                danger
                onClick={() => {
                  handleDeleteFile(file._id);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </Modal>
      <Modal
        title="Task"
        visible={toggle.task}
        onOk={handleOkTask}
        onCancel={handleCancelTask}
      >
        <div className=".formzskie">
          <label htmlFor="">Subject</label>
          <input
            type="text"
            name="Subject"
            value={wask.Subject}
            onChange={handleTaskChange}
          />
          <label htmlFor="">Description</label>
          <input
            type="text"
            onChange={handleTaskChange}
            name="Description"
            value={wask.Description}
          />
          <label htmlFor="">Start Date</label>
          <input
            type="date"
            onChange={handleTaskChange}
            name="StartDate"
            value={wask.StartDate}
          />
          <label htmlFor="">Due Date</label>
          <input
            type="date"
            onChange={handleTaskChange}
            name="DueDate"
            value={wask.DueDate}
          />
        </div>
      </Modal>
    </Badge.Ribbon>
  );
}

export default Card;
