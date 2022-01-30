import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import Card from "./Card";
import { Button, Input, Badge, Empty, message } from "antd";
import { Pie } from "@ant-design/charts";
import InsertGoal from "../../InsertGoal";
import OnGoingCalendar from "../../OnGoingCalendar";
import axios from "axios";
import "./home.css";
import validator from "validator";
import moment from "moment";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ReactToPrint from "react-to-print";
import { Tabs } from "antd";

function Home({
  goal,
  goalCount,
  request,
  requestCount,
  setGoal,
  Owner,
  setGoalCount
}) {
  const [search, setSearch] = useState({ Search: "" });
  const [appointment, setAppointment] = useState({
    Date: "",
    From: "",
    To: ""
  });
  const [appoint, setAppoint] = useState([]);
  const [appointTemplatez, setAppointTemplatez] = useState([]);
  const { TabPane } = Tabs;
  const getAppointment = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAppointment`)
      .then((res) => {
        setAppoint(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAppointmentTemplate = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAppointmentTemplate`)
      .then((res) => {
        console.log(res.data);
        setAppointTemplatez(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  var completeCount = 0;
  var ongoingCount = 0;
  const { Search } = Input;
  _.forEach(goal, (g) => {
    if (g.Status == "Complete") {
      completeCount++;
    }
    if (g.Status == "On Going") {
      ongoingCount++;
    }
  });

  const data = [
    {
      type: "On Going",
      value: ongoingCount
    },
    {
      type: "Complete",
      value: completeCount
    }
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 18
      }
    },
    interactions: [
      {
        type: "element-selected"
      },
      {
        type: "element-active"
      }
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 12
        },
        content: `Goal : ${goalCount}`
      }
    }
  };
  var completereqCount = 0;
  var ongoingreqCount = 0;
  _.forEach(request, (r) => {
    if (r.Status == "Complete") {
      completereqCount++;
    }
    if (r.Status == "On Going") {
      ongoingreqCount++;
    }
  });
  const datae = [
    {
      type: "On Going",
      value: ongoingreqCount
    },
    {
      type: "Complete",
      value: completereqCount
    }
  ];
  const confige = {
    appendPadding: 10,
    data: datae,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 18
      }
    },
    interactions: [
      {
        type: "element-selected"
      },
      {
        type: "element-active"
      }
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 12
        },
        content: `Requests : ${requestCount}`
      }
    }
  };
  const onSearch = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSearch = () => {
    const { Search } = search;
    axios
      .post(`${process.env.REACT_APP_KEY}/searchGoal`, { search: Search })
      .then((res) => {
        setGoal(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [qoute, setQoute] = useState({
    author: "",
    text: ""
  });
  const [handler, setHandler] = useState();
  const getHandler = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/getHandler`, { id: Owner._id })
      .then((res) => {
        console.log(res.data);
        setHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("https://type.fit/api/quotes")
      .then((res) => {
        setQoute(res.data[Math.floor(Math.random() * 10)]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getAppointmentTemplate();
    getAppointment();
    getHandler();
  }, []);
  const [today, setToday] = useState(moment(new Date()).format("MMMM Do YYYY"));
  useEffect(() => {
    setToday(moment(new Date()).format("MMMM Do YYYY"));
  }, [today]);

  const downloadCalendar = (ref) => {
    console.log(ref);
  };
  const componentRef = useRef();
  const calendarRef = useRef();

  const appChange = (e) => {
    const { value, name } = e.target;

    setAppointment((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const appSubmit = () => {
    if (!appointment.Date || !appointment.From || !appointment.To) {
      message.error("Please Fill up all the fields");
    } else if (moment(appointment.Date).isBefore(new Date())) {
      alert("The input date is from the past");
    } else if (
      parseInt(appointment.From.substr(0, 2)) < 7 ||
      parseInt(appointment.From.substr(0, 2)) > 17 ||
      parseInt(appointment.To.substr(0, 2)) < 7 ||
      parseInt(appointment.To.substr(0, 2)) > 17 ||
      parseInt(appointment.From.substr(0, 2)) >
        parseInt(appointment.To.substr(0, 2))
    ) {
      message.error("The Appointment must be in working hours");
    } else {
      axios
        .post(`${process.env.REACT_APP_KEY}/insertAppointment`, appointment)
        .then((res) => {
          alert(res.data);
          setAppointment({
            Date: "",
            From: "",
            To: ""
          });
          getAppointment();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteAppoint = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment")) {
      axios
        .delete(`${process.env.REACT_APP_KEY}/deleteAppointment`, {
          data: { id: id }
        })
        .then((res) => {
          alert("Sucessfully Deleted");
          getAppointment();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };
  const handleDeleteTemplate = (id) => {
    axios
      .delete(`${process.env.REACT_APP_KEY}/deleteAppointmentTemplate`, {
        data: {
          id: id
        }
      })
      .then((res) => {
        console.log(res.data);
        getAppointment();
        getAppointmentTemplate();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleMarkDone = (task) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/findGoal`, {
        id: task._id,
        task: task
      })
      .then((res) => {
        axios
          .post(`${process.env.REACT_APP_KEY}/markDone`, res.data)
          .then((res) => {
            axios
              .get(`${process.env.REACT_APP_KEY}/getGoal`)
              .then((res) => {
                console.log(res.data);
                message.success("Success");
                setGoal(res.data.data);
                getHandler();
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [template, setTemplate] = useState(null);
  const handlePostTemplate = () => {
    if (template) {
      axios
        .post(`${process.env.REACT_APP_KEY}/postAppointmentTemplate`, template)
        .then((res) => {
          message.success(res.data);
          getAppointment();
          getAppointmentTemplate();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.error("Please select a template before posting");
    }
  };

  const getTheDate = (day) => {
    const d = new Date();
    d.setDate(d.getDate() + ((day - d.getDay()) % 7) + 1);
    return d;
  };
  function callback(key) {}

  const [name, setName] = useState("");

  const [subApp, setSubApp] = useState({ Date: "", From: "", To: "" });
  const [appointTemplate, setAppointTemplate] = useState([]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSubChange = (e) => {
    const { name, value } = e.target;

    setSubApp((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleFromTo = (e) => {
    const { name, value } = e.target;

    setSubApp((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleAddTemplate = () => {
    if (!subApp.Date || !subApp.From || !subApp.To) {
      message.error("Please Fill up all the fields");
    } else if (
      parseInt(subApp.From.substr(0, 2)) < 7 ||
      parseInt(subApp.From.substr(0, 2)) > 17 ||
      parseInt(subApp.To.substr(0, 2)) < 7 ||
      parseInt(subApp.To.substr(0, 2)) > 17 ||
      parseInt(subApp.From.substr(0, 2)) > parseInt(subApp.To.substr(0, 2))
    ) {
      message.error("The Appointment must be in working hours");
    } else {
      setAppointTemplate((prev) => {
        return [...prev, subApp];
      });

      setSubApp({
        Date: "",
        From: "",
        To: ""
      });

      getAppointment();
    }
  };

  const handleSubmitTemplate = () => {
    if (appointTemplate === undefined || appointTemplate.length == 0) {
      message.error("There is no input in the template");
    } else if (appointTemplate.length < 2) {
      message.error("Template must be above one appointment.");
    } else {
      axios
        .post(`${process.env.REACT_APP_KEY}/insertAppointmentTemplate`, {
          Name: name,
          Appointment: appointTemplate
        })
        .then((res) => {
          message.success(res.data);
          setAppointTemplate([]);
          setName("");
          getAppointment();
          getAppointmentTemplate();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteTemp = (a) => {
    setAppointTemplate((prev) => {
      return prev.filter((b) => b != a);
    });
  };

  //TODO:
  const [editDate, setEditDate] = useState({ From: "", To: "" });

  const handleRejectAppointmentAll = () => {
    if (moment(editDate.To).isBefore(new Date())) {
      message.error("The Date must be greater than the date now.");
    } else {
      axios
        .post(`${process.env.REACT_APP_KEY}/RejectAppointMany`, editDate)
        .then((res) => {
          console.log(res.data);
          getAppointmentTemplate();
          getAppointment();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEditAppointmentAll = () => {
    if (moment(editDate.To).isBefore(editDate.From)) {
      message.error(
        "The Date that you want to change must be greater than the date on the past"
      );
    } else if (moment(editDate.To).isBefore(new Date())) {
      message.error("The Date must be greater than the date now.");
    } else {
      axios
        .post(`${process.env.REACT_APP_KEY}/editAppointMany`, editDate)
        .then((res) => {
          console.log(res.data);
          getAppointmentTemplate();
          getAppointment();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleDateEdit = (e) => {
    const { name, value } = e.target;

    setEditDate((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="homeContainer">
      {/* <div className="dateContainer ">
          <h1>{today}</h1>
          <p>
            "{qoute ? `${qoute.text} - ${qoute.author}` : "Getting Qoutes"}"
          </p>
        </div>
        <div className="pieContainer">
          <Pie {...config} autoFit={true} />
          <Pie {...confige} autoFit={true} />
        </div> */}

      <section className="home2">
        <OnGoingCalendar goal={goal} ref={componentRef} appointment={appoint} />
      </section>

      <section className="sec3">
        <div className="inputContainer">
          <div className="cont">
            <input
              type="text"
              name="Search"
              value={search.Search}
              placeholder="Search Here"
              onChange={onSearch}
            />
            <Button
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
            {Owner.Auth == "subadmin" ? null : (
              <InsertGoal
                Owner={Owner}
                setGoal={setGoal}
                setGoalCount={setGoalCount}
                admin={Owner}
              />
            )}

            <ReactToPrint
              trigger={() => <Button>Print Current Calendar</Button>}
              content={() => componentRef.current}
            />
          </div>
        </div>
        <h5 className="headers">Goals</h5>
        {goal.length != 0 ? (
          <div className="cardContainer">
            {goal.map((g) => {
              return (
                <Card
                  goal={g}
                  setGoal={setGoal}
                  setGoalCount={setGoalCount}
                  admin={Owner}
                />
              );
            })}
          </div>
        ) : (
          <Empty style={{ margin: "1px" }} />
        )}
      </section>

      {Owner.Auth == "subadmin" && handler ? (
        <section className="todoContainer">
          <h5 className="headers">To Do List</h5>
          <div className="cardContainer">
            {handler.map((h) => {
              if (h.Status != "Complete") {
                return (
                  <div className="cardTodo">
                    <h4>{h.Subject}</h4>
                    <p>{h.Description.substring(0, 16)}</p>
                    {h.Status == "Complete" ? (
                      <h4>Complete</h4>
                    ) : (
                      <Button
                        onClick={() => {
                          handleMarkDone(h);
                        }}
                      >
                        Mark As Done
                      </Button>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </section>
      ) : null}

      {Owner.Auth == "subadmin" && handler ? (
        <section className="todoContainer">
          <h5 className="headers">Complete Tasks</h5>
          <div className="cardContainer">
            {handler.map((h) => {
              if (h.Status == "Complete") {
                return (
                  <div className="cardTodo">
                    <h4>{h.Subject}</h4>
                    <p>{h.Description.substring(0, 16)}</p>
                  </div>
                );
              }
            })}
          </div>
        </section>
      ) : null}

      <section className="apsec">
        <h5 className="headers">Appointment Schedule List</h5>
        <div className="cardContainer">
          {appoint.map((a) => {
            return (
              <div className="CardApp">
                <h1 className="white">{new Date(a.Date).toDateString()}</h1>
                <h4 className="white">
                  From {moment(a.Time.From, "HH:mm:ss").format("h:mm A")} To{" "}
                  {moment(a.Time.To, "HH:mm:ss").format("h:mm A")}
                </h4>
                <h4 className="white">Status : {a.Status}</h4>
                {Owner.Auth == "subadmin" ? null : (
                  <Button
                    danger
                    onClick={() => {
                      handleDeleteAppoint(a._id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="tabCont">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Post Individual Appointment" key="1">
            <div className="pForm">
              <h5 className="headers"> Add Indvidual Appointment Schedule</h5>
              <label>Date</label>
              <input
                type="date"
                onChange={appChange}
                name="Date"
                value={appointment.Date}
              />
              <label>Time To Begin</label>
              <input
                type="time"
                onChange={appChange}
                name="From"
                value={appointment.From}
              />
              <label>Time To End</label>
              <input
                type="time"
                onChange={appChange}
                name="To"
                value={appointment.To}
              />
              <button
                type="submit"
                onClick={() => {
                  appSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </TabPane>
          <TabPane tab="Post Template Appointment" key="2">
            <div className="temptemp">
              <div className="templateContainerzz">
                {appointTemplatez ? (
                  appointTemplatez.map((at) => {
                    return (
                      <div
                        className="templateCard"
                        onClick={() => {
                          setTemplate(at);
                        }}
                        style={{
                          border: template == at ? "2px solid green" : null
                        }}
                      >
                        <h4>{at.Name}</h4>
                        <ul>
                          {at.Appointment.map((a) => {
                            return (
                              <li>
                                Date: {getTheDate(a.Date).toDateString()} From:{" "}
                                {moment(a.From, "HH:mm:ss").format("h:mm A")}{" "}
                                To: {moment(a.To, "HH:mm:ss").format("h:mm A")}
                              </li>
                            );
                          })}
                        </ul>
                        <Button
                          danger
                          onClick={() => {
                            handleDeleteTemplate(at._id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </div>
              <Button type="primary" onClick={handlePostTemplate}>
                Post Template
              </Button>
            </div>
          </TabPane>
          <TabPane tab="Add Appointment Template" key="3">
            <div className="templateContainer">
              <div className="templateForm">
                <h5 className="headers"> Add Template Appointment Schedule</h5>
                <label>Template Name</label>
                <input type="text" onChange={handleNameChange} value={name} />
                <label>Day</label>
                <select
                  name="Date"
                  id=""
                  value={subApp.Date}
                  onChange={handleSubChange}
                >
                  <option>Select Day</option>
                  <option value={7}>Monday</option>
                  <option value={8}>Tuesday</option>
                  <option value={9}>Wednesday</option>
                  <option value={10}>Thursday</option>
                  <option value={11}>Friday</option>
                </select>
                <label>Time To Begin</label>
                <input
                  type="time"
                  name="From"
                  value={subApp.From}
                  onChange={handleFromTo}
                />
                <label>Time To End</label>
                <input
                  type="time"
                  name="To"
                  value={subApp.To}
                  onChange={handleFromTo}
                />
                <div className="pot">
                  <button
                    onClick={() => {
                      handleAddTemplate();
                    }}
                  >
                    Add Appointment
                  </button>
                  <button
                    onClick={() => {
                      handleSubmitTemplate();
                    }}
                  >
                    Submit Template
                  </button>
                </div>
              </div>
              <div className="templateVisuals">
                {appointTemplate ? (
                  appointTemplate.map((a) => {
                    return (
                      <div className="apptcard">
                        <h4>Date : {getTheDate(a.Date).toDateString()}</h4>
                        <h4>
                          From : {moment(a.From, "HH:mm:ss").format("h:mm A")}
                        </h4>
                        <h4>
                          To : {moment(a.To, "HH:mm:ss").format("h:mm A")}
                        </h4>
                        <Button
                          danger
                          onClick={() => {
                            handleDeleteTemp(a);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </div>
            </div>
          </TabPane>
          {/* FIXME: */}
          <TabPane tab="Edit Appointment" key="4">
            <div className="editzContainerz">
              <h4 htmlFor="">Move the Appointment to a specific date.</h4>
              <label htmlFor="">From</label>
              <input
                type="date"
                name="From"
                onChange={handleDateEdit}
                value={editDate.From}
              />
              <label htmlFor="">To</label>
              <input
                type="date"
                name="To"
                onChange={handleDateEdit}
                value={editDate.To}
              />
              <Button
                onClick={() => {
                  handleEditAppointmentAll();
                }}
              >
                Submit
              </Button>
            </div>

            <div className="editzContainerz">
              <h4 htmlFor="">Reject the Appointment to a specific date.</h4>
              <label htmlFor="">From</label>
              <input
                type="date"
                name="From"
                onChange={handleDateEdit}
                value={editDate.From}
              />

              <Button
                onClick={() => {
                  handleRejectAppointmentAll();
                }}
              >
                Submit
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
