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
        <h4 className="edl">Edit Account</h4>
        <form action="" className="editzForm" onSubmit={handleSubmit}>
          <div className="leftpards">
            <div>
              <label>FullName</label>
              <input type="text" name="Fullname" onChange={handleChange} />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="Password" onChange={handleChange} />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                name="ConfirmPassword"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>SchoolIDNumber</label>
              <input
                type="text"
                name="SchoolIDNumber"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="rightpards">
            <div>
              <label>Email</label>
              <input type="email" name="Email" id="" onChange={handleChange} />
            </div>

            <div>
              <label>Course</label>
              <input type="text" name="Course" onChange={handleChange} />
            </div>
            <div>
              <label>Year</label>
              <input type="text" name="Year" onChange={handleChange} />
            </div>
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
