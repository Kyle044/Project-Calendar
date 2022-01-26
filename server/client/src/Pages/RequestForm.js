import React, { useState, useEffect } from "react";
import { Input, Skeleton, Checkbox, Descriptions, Badge } from "antd";

import axios from "axios";
import { Upload, message, Button, Empty } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { verifyToken } from "../Functions/api";
import { withRouter } from "react-router-dom";
import "../Css/requestPage/requestform.css";
import moment from "moment";
import Footer from "../Components/studentdashComponents/Footer";
import Header from "../Components/studentdashComponents/header";
import { Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined
} from "@ant-design/icons";
function Request({ history }) {
  const { Step } = Steps;
  const priceResult = (array) => {
    var price = 0;
    array.forEach((a) => {
      if (a == "Certificate of Grades") {
        price += 50;
      } else if (a == "Copy Of Grades") {
        price += 20;
      } else if (a == "Good Morals") {
        price += 20;
      } else if (a == "Honorable Dismissal") {
        price += 20;
      } else if (a == "Certificate of Graduation") {
        price += 20;
      } else if (a == "Certificate of Verification") {
        price += 20;
      } else if (a == "General Weighted Average") {
        price += 20;
      } else if (a == "Authentication/Certified True Copy (CTC)") {
        price += 20;
      }
    });
    return price;
  };

  const { TextArea } = Input;
  const [title, setTitle] = useState({
    CertificateofGrades: false,
    GoodMorals: false,
    CopyOfGrades: false,
    HonorableDismissal: false,
    CertificateofGraduation: false,
    CertificateofVerification: false,
    GeneralWeightedAverage: false,
    AuthenticationCertifiedTrueCopy: false
  });

  const [state, setstate] = useState({
    description: "",
    title: [],
    sender: "",
    program: "Graduate",
    file: [],
    appointment: ""
  });
  const [Appoint, setAppoint] = useState([]);
  const getSender = () => {
    verifyToken(localStorage.getItem("token"))
      .then((res) => {
        console.log(res);
        setstate((prev) => {
          return { ...prev, sender: res };
        });
      })
      .catch((err) => console.log(err));
  };
  const getAppointment = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAppointment`)
      .then((res) => {
        setAppoint(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeAppointment = (a) => {
    setstate((prev) => {
      return { ...prev, appointment: a };
    });
  };
  function formSubmit(e) {
    if ((state.title, state.file, state.appointment, state.description)) {
      if (state.file.length != 0) {
        const formData = new FormData();
        for (let i = 0; i < state.file.length; i++) {
          formData.append("files", state.file[i]);
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
            if (localStorage.getItem("token")) {
              axios
                .post(`${process.env.REACT_APP_KEY}/insertRequest`, {
                  ...state,
                  file: res.data.file
                })
                .then((res) => {
                  console.log(res.data);

                  setstate({
                    description: "",
                    title: [],
                    sender: "",
                    program: "Graduate",
                    file: [],
                    appointment: ""
                  });

                  alert("The request is Succesfull");
                  getSender();
                  getAppointment();
                  setCurrent(0);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              alert("The file is fail to save in database");
            }

            console.log("file is saved");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Please Attach a Identification ID and a Optional File");
      }
    } else {
      alert("Please Fill up all the fields");
    }
  }
  function fileChange(e) {
    setstate((prev) => {
      return { ...prev, file: e.target.files };
    });
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setstate((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleChangeRequest(e) {
    const { name, value, checked } = e.target;
    setTitle((prev) => {
      return { ...prev, [name]: checked };
    });

    if (checked) {
      setstate((prev) => {
        return { ...prev, title: [...prev.title, value] };
      });
    } else {
      var filtered = state.title.filter((a) => a != value);
      setstate((prev) => {
        return { ...prev, title: filtered };
      });
    }
  }

  useEffect(() => {
    verifyToken(localStorage.getItem("token"))
      .then((res) => {
        console.log(res);

        setstate((prev) => {
          return { ...prev, sender: res };
        });
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    getAppointment();
  }, []);
  const handleDeleteTitle = (t) => {
    setstate((prev) => {
      return { ...prev, title: prev.title.filter((a) => a != t) };
    });
  };
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: "Profile Validation",
      content: "Profile of the Student"
    },
    {
      title: "Files to Request",
      content: "Requests"
    },
    {
      title: "Finish",
      content: "Last-content"
    }
  ];
  const next = () => {
    console.log(state.program + " || " + state.file.length);
    if (current == 0) {
      if (state.program != 0 && state.file.length != 0) {
        setCurrent(current + 1);
      } else {
        message.error("Please fill up all the fields");
      }
    } else if (current == 1) {
      if (state.title.length < 1) {
        message.error("Please select your request");
      } else if (state.title.length > 2) {
        message.error("The request of documents is only limited by 2");
      } else {
        setCurrent(current + 1);
      }
    }
  };

  const prev = () => {
    if (current == 3) {
      setstate((prev) => {
        return { ...prev, title: [] };
      });
      setCurrent(current - 1);
    } else {
      setCurrent(current - 1);
    }
  };
  const onCheckBox = (e) => {
    console.log(e.target.name);
  };

  return (
    <div className="mainContainer">
      <Header />
      <div className="powerContainer">
        <div className="stepsDiv">
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </div>

        {current == 0 ? (
          <div className="container1">
            <h2 className="headerTitle">
              Request includes the validation of school number so it is required
              to send a picture of an Identification Card.
            </h2>
            <div className="containersub1">
              <div className="programDiv">
                <label className="labelz">Program</label>
                <select name="program" id="" onChange={handleChange}>
                  <option value="" selected>
                    Program
                  </option>
                  <option value="Graduate">Graduate</option>
                  <option value="Undergraduate">Undergraduate</option>
                </select>
              </div>
              <div className="idDiv">
                <label className="labelz">
                  Select Identification for validation
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  multiple
                  onChange={fileChange}
                />
              </div>
            </div>
          </div>
        ) : current == 1 ? (
          <div className="container2">
            <div className="checkDiv">
              <h2 className="headerTitles">
                Student request for up to 2 documents
              </h2>

              <Checkbox
                className="nawala"
                value="Certificate of Grades"
                name="CertificateofGrades"
                onChange={handleChangeRequest}
              >
                Certificate of Grades
              </Checkbox>
              <Checkbox
                value="Good Morals"
                onChange={handleChangeRequest}
                name="GoodMorals"
              >
                Good Morals
              </Checkbox>
              <Checkbox
                value="Copy Of Grades"
                onChange={handleChangeRequest}
                name="CopyOfGrades"
              >
                Copy Of Grades
              </Checkbox>
              <Checkbox
                value="Honorable Dismissal "
                onChange={handleChangeRequest}
                name="HonorableDismissal"
              >
                Honorable Dismissal
              </Checkbox>
              <Checkbox
                value="Certificate of Graduation"
                onChange={handleChangeRequest}
                name="CertificateofGraduation"
              >
                Certificate of Graduation
              </Checkbox>
              <Checkbox
                value="Certificate of Verification"
                onChange={handleChangeRequest}
                name="CertificateofVerification"
              >
                Certificate of Verification
              </Checkbox>
              <Checkbox
                value="General Weighted Average"
                onChange={handleChangeRequest}
                name="GeneralWeightedAverage"
              >
                General Weighted Average
              </Checkbox>
              <Checkbox
                value="Authentication/Certified True Copy (CTC)"
                onChange={handleChangeRequest}
                name="AuthenticationCertifiedTrueCopy"
              >
                Authentication/Certified True Copy (CTC)
              </Checkbox>
            </div>
            <div className="priceDiv">
              <h2 className="headerTitles">Price range</h2>
              <p>50 PHP Certificate of Grades</p>
              <p>20 PHP Good Morals</p>
              <p>20 PHP Copy Of Grades</p>
              <p>20 PHP Honorable Dismissal</p>
              <p>20 PHP Certificate of Graduation</p>
              <p>20 PHP Certificate of Verification</p>
              <p>20 PHP General Weighted Average</p>
              <p>20 PHP Authentication/Certified True Copy (CTC)</p>
            </div>
          </div>
        ) : current == 2 ? (
          <div className="container3">
            <div className="appContz">
              <h2 className="headerTitles">
                {Appoint ? "Available Appointment" : "No Available Appointment"}
              </h2>

              {Appoint ? (
                <div className="appo">
                  {Appoint.map((a) => {
                    if (
                      moment(new Date()).isSameOrAfter(
                        moment(new Date(a.Date)).subtract(1, "day")
                      )
                    ) {
                      return (
                        <div className="appoCard notAvailable">
                          <h4>{new Date(a.Date).toDateString()}</h4>
                          <h4>Not Available</h4>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="appoCard"
                          onClick={() => {
                            handleChangeAppointment(a);
                          }}
                        >
                          <h4>{new Date(a.Date).toDateString()}</h4>
                          <h4>
                            From{" "}
                            {moment(a.Time.From, "HH:mm:ss").format("h:mm A")}{" "}
                            To {moment(a.Time.To, "HH:mm:ss").format("h:mm A")}
                          </h4>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                <Empty />
              )}
            </div>
            <div className="comment">
              <h2 className="headerTitles">Comment</h2>
              <Input
                id="description"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="resolt">
              <Descriptions
                title="Request Information"
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label="Student Program">
                  {state.program}
                </Descriptions.Item>
                <Descriptions.Item label="Appointment">
                  {state.appointment ? (
                    <div>
                      <h4>{new Date(state.appointment.Date).toDateString()}</h4>
                      <h4>
                        From{" "}
                        {moment(state.appointment.Time.From, "HH:mm:ss").format(
                          "h:mm A"
                        )}{" "}
                        To{" "}
                        {moment(state.appointment.Time.To, "HH:mm:ss").format(
                          "h:mm A"
                        )}
                      </h4>
                    </div>
                  ) : (
                    <Empty description="No Selected Appointment" />
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Requested files">
                  {state.title ? (
                    <div className="rezCon">
                      {state.title.map((r) => {
                        return (
                          <div className="subCon">
                            <h3>{r}</h3>
                            <Button
                              danger
                              onClick={() => {
                                handleDeleteTitle(r);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <Empty description="No Selected Document" />
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Student Profile">
                  {state.sender ? (
                    <div className="studInf">
                      <h4>Student # : {state.sender.SchoolIDNumber}</h4>
                      <h4>Full Name : {state.sender.Fullname}</h4>
                      <h4>Email : {state.sender.Email}</h4>
                      <h4>Course : {state.sender.Course}</h4>
                      <h4>Year : {state.sender.Year}</h4>
                    </div>
                  ) : (
                    <Empty description="Cant Get Student Info Please Reload" />
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Comment">
                  {state.description ? (
                    <h4>{state.description}</h4>
                  ) : (
                    <Empty description="N/A" />
                  )}
                </Descriptions.Item>

                <Descriptions.Item label="Price">
                  {state.title.length > 0 ? (
                    <h4>
                      {priceResult(state.title)} PHP you can pay this at the
                      campus cashier.
                    </h4>
                  ) : (
                    <h4>N/A</h4>
                  )}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        ) : null}

        <div className="btnNextPreviousDone">
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                formSubmit();
              }}
            >
              Done
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default withRouter(Request);
