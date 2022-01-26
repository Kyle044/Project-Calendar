import React, { useState, useRef } from "react";
import { Input } from "antd";
import { Select } from "antd";

import "../Css/Login.css";
import axios from "axios";

import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { login } from "../redux/actions/index";
import validator from "validator";
import { Alert } from "antd";
function Home({ history }) {
  const dispatch = useDispatch();
  const [acc, setacc] = useState({ Email: "", Password: "" });
  const userData = useSelector((state) => state.isLoggedReducer);
  const [terms, setTerms] = useState(false);
  const [regState, setRegState] = useState({
    Email: "",
    Password: "",
    ConfrimPassword: "",
    Course: "",
    Year: "",
    schoolNum: "",
    FullName: ""
  });
  const { Option } = Select;
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
  function handleChange2(e) {
    const { name, value } = e.target;
    setRegState((prev) => {
      return { ...prev, [name]: value };
    });
  }
  /**
   * Handle Submit
   */
  function handleSubmit() {
    if (!validator.isEmpty(acc.Email) && !validator.isEmpty(acc.Password)) {
      axios
        .post(`${process.env.REACT_APP_KEY}/loginStud`, acc)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          axios
            .get(`${process.env.REACT_APP_KEY}/protectedStud`, {
              headers: { Authorization: res.data.token }
            })
            .then((res) => {
              dispatch(login(res.data));
              localStorage.setItem("info", res.data);
              history.push("/StudentDash");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          if (err.response.status == 422) {
            alert("Invalid Email or Password");
          } else {
            alert("Invalid Email or Password");
          }
        });
    } else {
      alert("Please Fill Up All The Fields");
    }
  }

  /**
   * Handle Register go
   */
  function handleRegister(e) {
    loginRef.current.classList.toggle("goToRegister");
    regRef.current.classList.toggle("showReg");
  }
  const [error, setError] = useState({
    bool: false,
    mes: "",
    type: ""
  });

  function passwordStrength(pass) {
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    if (!pattern.test(regState.Password)) {
      setError({
        bool: true,
        mes: "Input password that has 6 character above atleast one Capital letter has numeric value and atleast one special character",
        type: "error"
      });
      setTimeout(() => {
        setError({
          bool: false,
          mes: "",
          type: ""
        });
      }, 4000);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Handle Register
   */
  function handleRegisterr() {
    if (!terms) {
      setError({
        bool: true,
        mes: "Please Accept the EU Terms and Agreements",
        type: "error"
      });
      setTimeout(() => {
        setError({
          bool: false,
          mes: "",
          type: ""
        });
      }, 4000);
    } else if (
      !regState.Email ||
      !regState.FullName ||
      !regState.Password ||
      !regState.Year ||
      !regState.schoolNum ||
      !regState.Course ||
      regState.Year == "" ||
      regState.Course == "" ||
      regState.schoolNum == "" ||
      regState.Password == "" ||
      regState.FullName == "" ||
      regState.Email == ""
    ) {
      setError({
        bool: true,
        mes: "Please fill up all the fields",
        type: "error"
      });
      setTimeout(() => {
        setError({
          bool: false,
          mes: "",
          type: ""
        });
      }, 4000);
    } else if (passwordStrength(regState.Password)) {
    } else if (!validator.isEmail(regState.Email)) {
      setError({
        bool: true,
        mes: "The email is not valid",
        type: "error"
      });
      setTimeout(() => {
        setError({
          bool: false,
          mes: "",
          type: ""
        });
      }, 4000);
    } else if (regState.ConfrimPassword != regState.Password) {
      setError({
        bool: true,
        mes: "Password does not match",
        type: "error"
      });
      setTimeout(() => {
        setError({
          bool: false,
          mes: "",
          type: ""
        });
      }, 4000);
    } else {
      const data = {
        Email: regState.Email,
        Password: regState.Password,
        FullName: regState.FullName,
        schoolnum: regState.schoolNum,
        Course: regState.Course,
        Year: regState.Year
      };
      axios
        .post(`http://localhost:5000/api/registerStud`, data)
        .then((res) => {
          setError({
            bool: true,
            mes: res.data,
            type: "success"
          });
          setTimeout(() => {
            setError({
              bool: false,
              mes: "",
              type: ""
            });
          }, 4000);
          setRegState({
            Email: "",
            Password: "",
            ConfrimPassword: "",
            Course: "",
            Year: "",
            schoolNum: "",
            FullName: ""
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  /**
   * Back To Login
   */
  function handleBackToLogin(e) {
    loginRef.current.classList.toggle("goToRegister");
    regRef.current.classList.toggle("showReg");
  }
  function onChangeCheck(e) {
    setTerms(e.target.checked);
  }
  function handleChange2select(value) {
    setRegState((prev) => {
      return { ...prev, Year: value };
    });
  }
  function handleChange2select2(value) {
    setRegState((prev) => {
      return { ...prev, Course: value };
    });
  }
  return (
    <div className="mainDiv">
      <div ref={loginRef} className="loginDiv">
        <div className="howder">
          <h3>Sign In</h3>
          <p>Welcome to Registrar</p>
        </div>

        <Input
          placeholder="Email"
          type="email"
          name="Email"
          id=""
          value={acc.Email}
          onChange={(e) => handleChange(e)}
        />

        <Input
          placeholder="Password"
          type="password"
          name="Password"
          id=""
          value={acc.Password}
          onChange={(e) => handleChange(e)}
        />
        <div className="btn">
          <Button type="primary" onClick={handleSubmit}>
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
        <div className="termsContainer">
          <p>
            " By using this website you certify that you have read and reviewed
            this Agreement and that you agree to comply with its terms. If you
            do not want to be bound by the terms of this Agreement, you are
            advised to leave the website accordingly hemel only grants see and
            access of this website, its services to those who have accepted its
            terms we do our best to provide a secure website where it cant be
            hacked any causes that the data will be hacked then it will be the
            users fault.
          </p>
          <Checkbox onChange={onChangeCheck}>
            EU Accept Terms & Agreements
          </Checkbox>
        </div>
        <div className="form">
          <h3>Register</h3>
          {error.bool ? (
            <Alert
              message={error.mes}
              type={error.type}
              showIcon
              className="alertTo"
            />
          ) : null}
          <div className="cont">
            <div className="prof">
              <Input
                onChange={(e) => {
                  handleChange2(e);
                }}
                type="text"
                name="schoolNum"
                value={regState.schoolNum}
                placeholder="School ID Number"
              />
              <Input
                onChange={(e) => {
                  handleChange2(e);
                }}
                type="text"
                name="FullName"
                value={regState.FullName}
                placeholder="Full Name"
              />
              <Select
                name="Course"
                defaultValue="wats"
                onChange={handleChange2select2}
                value={regState.Course}
                className="selectheheshet"
              >
                <Option value="" selected>
                  Course
                </Option>
                <Option value="Bachelor of Science in Information Technology">
                  BS in Information Technology
                </Option>
                <Option value="Bachelor of Science in Computer Science">
                  BS in Science in Computer Science
                </Option>
                <Option value="Bachelor of Science in Business Administration">
                  BS in Business Administration
                </Option>
                <Option value="Bachelor of Science in Entrepreneurship">
                  BS in Entrepreneurship
                </Option>
                <Option value="Bachelor of Science in Office Administration">
                  BS in Office Administration
                </Option>
                <Option value="Bachelor of Science in Mathematics">
                  BS in Mathematics
                </Option>
                <Option value="Bachelor of Science in Industrial Technology">
                  BS in Industrial Technology
                </Option>
                <Option value="Bachelor of Science in Criminology">
                  BS in Criminology
                </Option>
                <Option value="Bachelor in Public Administration">
                  Bachelor in Public Administration
                </Option>
              </Select>
              <Select
                name="Year"
                defaultValue="Year Level"
                onChange={handleChange2select}
                value={regState.Year}
                className="selecthehe"
              >
                <Option value="" selected>
                  Year Level
                </Option>
                <Option value="IV">IV</Option>
                <Option value="III">III</Option>
                <Option value="II">II</Option>
                <Option value="I">I</Option>
              </Select>
            </div>
            <div className="acc">
              <Input
                onChange={(e) => {
                  handleChange2(e);
                }}
                type="email"
                name="Email"
                placeholder="Email"
                id=""
                value={regState.Email}
              />

              <Input
                onChange={(e) => {
                  handleChange2(e);
                }}
                type="password"
                name="Password"
                placeholder="Password"
                value={regState.Password}
                id=""
              />
              <Input
                onChange={(e) => {
                  handleChange2(e);
                }}
                type="password"
                name="ConfrimPassword"
                placeholder="Confirm Password"
                value={regState.ConfrimPassword}
                id=""
              />
            </div>
          </div>
          <div className="btnDiv">
            <Button
              type="primary"
              onClick={() => {
                handleRegisterr();
              }}
            >
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
    </div>
  );
}

export default withRouter(Home);
