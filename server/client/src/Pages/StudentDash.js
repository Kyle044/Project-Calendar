import React, { useState, useEffect } from "react";
import Nav from "../Components/studentdashComponents/Nav";
import { withRouter } from "react-router-dom";
import validator from "validator";
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAdvisory`)
      .then((res) => {
        setAnnounce(res.data.data);
        console.log(res.data.data);
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
