import React, { useState, useRef } from "react";
import { Input } from "antd";

import "../Css/Login.css";
import axios from "axios";

import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { login } from "../redux/actions/index";
import validator from "validator";

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
          } else if (err.response.status == 402) {
            axios
              .post(`${process.env.REACT_APP_KEY}/login`, acc)
              .then((res) => {
                console.log("this is the admin");

                localStorage.setItem("token", res.data.token);
                axios
                  .get(`${process.env.REACT_APP_KEY}/protected`, {
                    headers: { Authorization: res.data.token }
                  })
                  .then((res) => {
                    dispatch(login(res.data));
                    localStorage.setItem("info", res.data);
                    history.push("/AdminDash");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                if (err.response.status == 422) {
                  alert("Invalid Email or Password");
                } else if (err.response.status == 402) {
                  axios
                    .post(`${process.env.REACT_APP_KEY}/loginReg`, acc)
                    .then((res) => {
                      console.log(res.data + "This is the registrar client");
                    })
                    .catch((err) => {});
                }
              });
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

  /**
   * Handle Register
   */
  function handleRegisterr() {
    if (!terms) {
      alert("Please accept the EU Terms and Agreements.");
    }
    else if (regState.ConfrimPassword != regState.Password) {
      alert("The Password Does not Match")
    }
    else {
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
            alert(res.data.msg);
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
  return (
    <div className="mainDiv">
      <div ref={loginRef} className="loginDiv">
        <h3>Sign In</h3>
        <p>Welcome to Registrar</p>

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
            " Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laudantium culpa explicabo odio facilis officia nobis quod ad earum
            saepe corporis quam, perferendis dolorem accusantium iusto
            consequatur quisquam necessitatibus et quidem eos quasi assumenda
            ducimus animi placeat magni. Aperiam commodi unde, alias dolorum
            vitae aliquam possimus labore illo sed repellat magni Lorem, ipsum
            dolor sit amet consectetur adipisicing elit. Voluptatibus quaerat
            optio fuga nisi cum quae eius voluptates, libero mollitia corrupti!
          </p>
          <Checkbox onChange={onChangeCheck}>
            EU Accept Terms & Agreements
          </Checkbox>
        </div>
        <div className="form">
          <h3>Register</h3>
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
              <Input
                onChange={(e) => {
                  handleChange2(e);
                }}
                type="text"
                name="Course"
                value={regState.Course}
                placeholder="Course"
              />
              <Input
                onChange={(e) => {
                  handleChange2(e);
                }}
                type="text"
                name="Year"
                placeholder="Year Level"
                value={regState.Year}
              />
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
