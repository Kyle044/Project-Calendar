import React from "react";
import Header from "../Components/studentdashComponents/header";
import Footer from "../Components/studentdashComponents/Footer";
import Content from "../Components/aboutcontent";
import "../Css/student/aboutreg.css";
function AboutReg() {
  return (
    <div className="MainContainer">
      <div>
        <Header />
      </div>
      <div>
        <Content />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AboutReg;
