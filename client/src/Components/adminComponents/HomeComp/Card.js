import React, { useState, useEffect } from "react";
import "./home.css";
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
          <p>{goal.Description.substr(0, 22)}</p>
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
          title="Tasks"
          placement="right"
          onClose={onClose}
          visible={visible}
          width={390}
        >
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
    </Badge.Ribbon>
  );
}

export default Card;
