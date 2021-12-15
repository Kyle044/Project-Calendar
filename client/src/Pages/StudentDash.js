import React, { useState, useEffect } from "react";
import Nav from "../Components/studentdashComponents/Nav";
import { withRouter } from "react-router-dom";
import validator from "validator";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Footer from "../Components/studentdashComponents/Footer";
import { Skeleton, Carousel, Button } from "antd";
import { verifyToken } from "../Functions/api";
import "../Css/student/StudentDash.css";
import axios from "axios";
function StudentDash({ history }) {
  const [info, setInfo] = useState();

  const [announce, setAnnounce] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAdvisory`)
      .then((res) => {
        setAnnounce(res.data.data);
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
          {/**
           * This is the section 1
           */}
          <section className="section1">
            <Nav />

            <div className="container1">
              <div className="msg">
                <h1>
                  Hello and{" "}
                  {curHr < 12
                    ? "Good Morning"
                    : curHr < 18
                    ? "Good Afternoon"
                    : "Good Evening"}{" "}
                  {info.Fullname}
                </h1>
                <p>
                  Here is where you can request to the registrar and receive the
                  response from the registrar.
                </p>
              </div>
              <img src="./images/logo.png" alt="" />
            </div>
          </section>
          <section className="section2">
            <Carousel autoplay>
              {announce.map((a) => {
                return (
                  <div>
                    <h3 style={contentStyle}>{a.Description}</h3>
                    <p></p>
                  </div>
                );
              })}
            </Carousel>
          </section>

          <div className="section3">
            <div className="card">
              <div className="cardHeader">
                <img src="./images/document.png" alt="" />
              </div>
              <div className="cardDescript">
                <h3>Online Request Student Records</h3>
              </div>
              <div className="cardBtn">
                <Button
                  danger
                  onClick={() => {
                    request();
                  }}
                >
                  Request
                </Button>
              </div>
            </div>
            <div className="card">
              <div className="cardHeader">
                <img src="./images/light-bulb.png" alt="" />
              </div>
              <div className="cardDescript">
                <h3>Frequently Asked Questions</h3>
              </div>
              <div className="cardBtn">
                <Button
                  danger
                  onClick={() => {
                    history.push("/FAQStudPage");
                  }}
                >
                  Read
                </Button>
              </div>
            </div>
            <div className="card">
              <div className="cardHeader">
                <img src="./images/downloadfile.png" alt="" />
              </div>
              <div className="cardDescript">
                <h3>Forms To Download</h3>
              </div>
              <div className="cardBtn">
                <Button
                  danger
                  onClick={() => {
                    history.push("/FormStudPage");
                  }}
                >
                  Preview
                </Button>
              </div>
            </div>

            <div className="card">
              <div className="cardHeader">
                <img src="./images/school.png" alt="" />
              </div>
              <div className="cardDescript">
                <h3>About the Registrar</h3>
              </div>
              <div className="cardBtn">
                <Button danger onClick={() => {
                    history.push("/AboutReg");
                  }}
                >Read</Button>
              </div>
            </div>

            <div className="card">
              <div className="cardHeader">
                <img src="./images/guide.png" alt="" />
              </div>
              <div className="cardDescript">
                <h3>Request Guide</h3>
              </div>
              <div className="cardBtn">
                <Button danger>Read</Button>
              </div>
            </div>
            <div className="card">
              <div className="cardHeader">
                <img src="./images/cabinet.png" alt="" />
              </div>
              <div className="cardDescript">
                <h3>Transaction History</h3>
              </div>
              <div className="cardBtn">
                <Button danger>Read</Button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default withRouter(StudentDash);
