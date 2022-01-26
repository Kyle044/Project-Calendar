import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/studentdashComponents/header";
import Footer from "../../Components/studentdashComponents/Footer";
import { verifyToken } from "../../Functions/api";
import Card from "../../Components/Card";
import "./studentsettings.css";
function StudentSettings() {
  const initialState = {
    SchoolIDNumber: "",
    Fullname: "",
    Password: "",
    ConfirmPassword: "",
    Email: "",
    Course: "",
    Year: ""
  };
  const [state, setState] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.ConfirmPassword != state.Password) {
      alert("Password does not match");
    } else {
      verifyToken(localStorage.getItem("token"))
        .then((user) => {
          axios
            .post(`${process.env.REACT_APP_KEY}/updateStud`, {
              ...state,
              id: user._id
            })
            .then((res) => {
              alert(res.data.msg);
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div>
      <Header />

      <div className="studEditContainer">
     
      <form action="" className="editzForm" onSubmit={handleSubmit}>
      <div className="leftpards">
        <h2 className="accinfo">ACCOUNT INFORMATION</h2>
            <div>
              <p className="label">Full Name (Fname , Mi, Lname)</p>
              <input type="text" name="Fullname" onChange={handleChange} className="textbox"/>
            </div>
            <div>
            <p className="label">Email</p>
              <input type="email" name="Email" id="" onChange={handleChange} className="textbox"/>
            </div>

            <div>
            <p className="label">Course</p>
              <input type="text" name="Course" onChange={handleChange} className="textbox"/>
            </div>
            <div>
            <p className="label">Year</p>
              <input type="text" name="Year" onChange={handleChange} className="textbox"/>
            </div>

            <h2 className="accinfo">CHANGE PASSWORD</h2>
            <div>
            <p className="label">Password</p>
              <input type="password" name="Password" onChange={handleChange} className="textbox"/>
            </div>
            <div>
            <p className="label">Confirm Password</p>
              <input
                type="password"
                name="ConfirmPassword"
                onChange={handleChange}
                className="textbox"
              />
            </div>
          
      </div>
      <div className="bbutton">
            <button type="submit" className="ssubmit">
              Submit
            </button>
            </div>
      </form>
      </div>
      <Card />
      <Footer />
    </div>
  );
}

export default StudentSettings;
