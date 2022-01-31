import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/studentdashComponents/header";
import Footer from "../../Components/studentdashComponents/Footer";
import { verifyToken } from "../../Functions/api";
import Card from "../../Components/verticalCard/VerticalCard";
import { Input, Button } from "antd";
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
    if (!state.Fullname || !state.Email || !state.Password) {
      alert("Please fill up all the field.");
    } else if (state.ConfirmPassword != state.Password) {
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
              setState(initialState);
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
        <form action="">
          <h2 className="wat">Edit Profile</h2>
          <label htmlFor="">Full Name</label>
          <Input type="text" name="Fullname" onChange={handleChange} />
          <label htmlFor="">Email</label>
          <Input type="email" name="Email" id="" onChange={handleChange} />
          <label htmlFor="">Password</label>
          <Input type="password" name="Password" onChange={handleChange} />
          <label htmlFor="">Confirm Password</label>
          <Input
            type="password"
            name="ConfirmPassword"
            onChange={handleChange}
          />
          <Button className="bttn"
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </form>
        <Card />
      </div>

      <Footer />
    </div>
  );
}

export default StudentSettings;
