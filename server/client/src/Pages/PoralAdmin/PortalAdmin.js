import React, { useState, useEffect } from "react";
import validator from "validator";
import "./portaladmin.css";
import { login } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { Button } from "antd";
function PortalAdmin({ history }) {
  const initialState = {
    Email: "",
    Password: ""
  };
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.Email && state.Password) {
      if (validator.isEmail(state.Email)) {
        axios
          .post(`${process.env.REACT_APP_KEY}/login`, state)
          .then((res) => {
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
            }
            if (err.response.status == 402) {
              alert("Invalid Email or Password");
            }
          });
      } else {
        alert("Input a right Email");
      }
    } else {
      alert("Please Fill Up all the fields");
    }
  };
  return (
    <div
      className="portalMaster"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <form action="" className="portalForm">
        <div className="portalLogo">
          <img src="./images/LOGO1.png" alt="" /> <h4>Admin Log-in</h4>
        </div>
        <label>Email</label>
        <input
          type="text"
          onChange={handleChange}
          name="Email"
          value={state.Email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="Password"
          value={state.Password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default withRouter(PortalAdmin);
