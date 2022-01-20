import React, { useState, useEffect } from "react";
import { Input, Skeleton } from "antd";
import axios from "axios";
import { Upload, message, Button, Empty } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { verifyToken } from "../Functions/api";
import { withRouter } from "react-router-dom";
import "../Css/requestPage/requestform.css";
import moment from "moment";
import Footer from "../Components/studentdashComponents/Footer";
import Header from "../Components/studentdashComponents/header";
function Request({ history }) {
  const priceResult = (array, program) => {
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
      e.preventDefault();
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
      e.preventDefault();
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
    if (e.target.value == "N/A") {
    } else {
      setstate((prev) => {
        return { ...prev, title: [...prev.title, e.target.value] };
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
  }, [Appoint]);
  const handleDeleteTitle = (t) => {
    setstate((prev) => {
      return { ...prev, title: prev.title.filter((a) => a != t) };
    });
  };
  return (
    <div className="mainContainer">
      <Header />
      {state.sender ? (
        <div className="formdiv">
          <h2 className="headerTitle">
            Request includes the validation of school number so it is required
            to send a picture of an Identification Card.
          </h2>
          <form
            onSubmit={(e) => {
              formSubmit(e);
            }}
          >
            <div className="programDiv">
              <label className="labelz">Program</label>
              <select name="program" id="" onChange={handleChange}>
                <option value="Graduate" selected>
                  Graduate
                </option>
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
            <div className="appDiv">
              <label className="labelz">Available Appointment</label>

              <div className="appointmentContainers">
                {Appoint ? (
                  Appoint.map((a) => {
                    if (a.Status == "Vacant") {
                      return (
                        <div
                          className="appcard"
                          style={{
                            borderColor:
                              state.appointment == a
                                ? "rgb(255, 228, 49)"
                                : "gray"
                          }}
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
                    } else {
                      return <Empty />;
                    }
                  })
                ) : (
                  <h1>There is no Available Appointment</h1>
                )}
              </div>
            </div>

            <div className="comDiv">
              <label className="labelz">Comment</label>
              <Input
                style={{ height: "120px" }}
                id="description"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="reqDiv">
              <label className="labelz">Files to Request</label>
              <select name="title" id="" onChange={handleChangeRequest}>
                <option value="N/A" selected>
                  Select Something
                </option>
                <option value="Certificate of Grades">
                  Certificate of Grades
                </option>
                <option value="Copy Of Grades">Copy Of Grades</option>
                <option value="Good Morals">Good Morals</option>
                <option value="Honorable Dismissal">Honorable Dismissal</option>
                <option value="Certificate of Graduation">
                  Certificate of Graduation
                </option>
                <option value="Certificate of Verification">
                  Certificate of Verification
                </option>
                <option value="General Weighted Average">
                  General Weighted Average
                </option>
                <option value="Authentication/Certified True Copy (CTC)">
                  Authentication/Certified True Copy (CTC)
                </option>
              </select>
            </div>
            <label className="labelz">Result</label>

            <div className="resultContainer">
              <div className="proContainer">
                <h4>Program : {state.program}</h4>
                <h4>Comment: {state.description}</h4>
                <h4>Price : {priceResult(state.title, state.program)} </h4>
              </div>

              <div className="fileContainer">
                <h4>Selected Request files</h4>
                {state.title.map((t) => {
                  return (
                    <div className="filecard">
                      <h4>{t}</h4>
                      <Button danger onClick={() => handleDeleteTitle(t)}>
                        {" "}
                        Delete
                      </Button>
                    </div>
                  );
                })}
              </div>
              {state.appointment != "" ? (
                <div className="appcard">
                  <h4>Scheduled Appointment</h4>
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
              ) : null}
            </div>

            <button
              type="submit"
              style={{
                width: "150px",
                margin: "auto",
                fontSize: "1.1rem",
                borderRadius: "30px",
                padding: "5px 0px",
                backgroundColor: "#FF5C58",
                border: "1px solid black",
                marginBottom: "1rem",
                cursor: "pointer"
              }}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <Skeleton />
      )}

      <Footer />
    </div>
  );
}

export default withRouter(Request);
