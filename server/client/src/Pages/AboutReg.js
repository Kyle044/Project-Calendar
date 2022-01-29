import React from "react";
import Header from "../Components/studentdashComponents/header";
import Footer from "../Components/studentdashComponents/Footer";
import Content from "../Components/aboutcontent";
import Card from "../Components/verticalCard/VerticalCard";
import "../Css/student/aboutreg.css";
function AboutReg() {
  return (
    <div className="MainContainer">
      <Header />
      <div className="MainContainerzzz">
        <Content />
        <Card />
      </div>
      <Footer />
    </div>
  );
}

export default AboutReg;
