import React, { useState, useRef } from "react";
import Nav from "../Components/Nav";
import "../Css/Login.css";
import { Button, DatePicker } from "antd";
function Home() {
  const [acc, setacc] = useState({ Email: "", Password: "" });
  const loginRef = useRef();
  const regRef = useRef();
  /**
   * Handle Change
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setacc((prev) => {
      return { ...prev, [name]: value };
    });
  }

  /**
   * Handle Submit
   */
  function handleSubmit(e) {
    console.log(acc);
  }

  /**
   * Handle Register
   */
  function handleRegister(e) {
    loginRef.current.classList.toggle("goToRegister");
    regRef.current.classList.toggle("showReg");
  }

  /**
   * Back To Login
   */
  function handleBackToLogin(e) {
    loginRef.current.classList.toggle("goToRegister");
    regRef.current.classList.toggle("showReg");
  }
  return (
    <div className="mainDiv">
      <div ref={loginRef} className="loginDiv">
        <h3>Sign In</h3>
        <p>Welcome to Registrar</p>
        <input
          placeholder="Email"
          type="email"
          name="Email"
          id=""
          value={acc.Email}
          onChange={(e) => handleChange(e)}
        />

        <input
          placeholder="Password"
          type="password"
          name="Password"
          id=""
          value={acc.Password}
          onChange={(e) => handleChange(e)}
        />
        <div className="btn">
          <Button
            type="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleRegister();
            }}
          >
            Register
          </Button>
        </div>
      </div>

      <div ref={regRef} className="regDiv">
        <h3>Register</h3>
        <div className="cont">
          <div className="prof">
            <input type="text" name="Id" placeholder="School ID Number" />
            <input type="text" name="FullName" placeholder="Full Name" />
            <input type="text" name="Course" placeholder="Course" />
            <input type="text" name="Year" placeholder="Year Level" />
          </div>
          <div className="acc">
            <input type="email" name="Email" placeholder="Email" id="" />

            <input
              type="password"
              name="Password"
              placeholder="Password"
              id=""
            />
            <input
              type="password"
              name="cPassword"
              placeholder="Confirm Password"
              id=""
            />
          </div>
        </div>

        <div className="btnDiv">
          <Button type="primary" onClick={() => {}}>
            Submit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleBackToLogin();
            }}
          >
            Have an Account?
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
