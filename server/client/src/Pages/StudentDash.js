import React, { useState, useEffect } from "react";
import Nav from "../Components/studentdashComponents/Nav";
import { withRouter } from "react-router-dom";
import validator from "validator";
import moment from "moment";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Footer from "../Components/studentdashComponents/Footer";
import { Skeleton, Carousel, Button } from "antd";
import { verifyToken } from "../Functions/api";
import Card from "../Components/Card";
import "../Css/student/StudentDash.css";
import Header from "../Components/studentdashComponents/header";
import axios from "axios";
import FirstSection from "../Components/studentComponents/FirstSection.js";
import SecondSection from "../Components/studentComponents/SecondSection.js";
function StudentDash({ history }) {
  const [info, setInfo] = useState();

  const [announce, setAnnounce] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const handleme = () => {
    appointment.forEach((a) => {
      console.log(
        "Before : " +
          new Date().toDateString() +
          " || " +
          "After : " +
          new Date(moment(a.Date).add(0, "day")).toDateString()
      );
      // Testing if date now is above the deadline
      if (moment(new Date()).isAfter(new Date(moment(a.Date).add(1, "day")))) {
        console.log("above deadline");
      } else {
        console.log("before the deadline");
      }
      //Testing if date now has an interval of 1 day to work on the appointment
      if (
        moment(new Date()).isSameOrAfter(
          moment(new Date(a.Date)).subtract(1, "day")
        )
      ) {
        console.log("Dont have interval");
      } else {
        console.log("Has interval");
      }
    });
  };
  const getAppointment = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAppointment`)
      .then((res) => {
        console.log(res.data);
        setAppointment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAdvisory`)
      .then((res) => {
        setAnnounce(res.data.data);
        getAppointment();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function request() {
    history.push("/Request");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    verifyToken(token).then((value) => {
      setInfo(value);
    });
    if (validator.isEmpty(token)) {
      history.push("/");
    }
  }, []);
  var today = new Date();
  var curHr = today.getHours();

  const contentStyle = {
    height: "13rem",
    color: "black",
    lineHeight: "10rem",
    textAlign: "center",
    background: "#FF5C58"
  };

  return (
    <div>
      {info ? (
        <div>
          <Header />
          <FirstSection />
          {/* <Button
            onClick={() => {
              handleme();
            }}
          >
            Click me plz
          </Button> */}
          <Card />
          <SecondSection announce={announce} />
          <Footer />
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default withRouter(StudentDash);
