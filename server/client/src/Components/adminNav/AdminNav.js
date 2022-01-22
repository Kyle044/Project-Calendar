import React, { useState, useEffect } from "react";
import "./adminnav.css";
import { withRouter } from "react-router-dom";
import { HomeTwoTone } from "@ant-design/icons";
function AdminNav({ history, masterToggle }) {
  var initialState = {
    Home: false,
    Advisory: false,
    Requests: false,
    Forms: false,
    FAQ: false,
    Settings: false
  };
  const [toggle, setToggle] = useState(initialState);
  function handleToggle(name) {
    masterToggle(name);
    setToggle(initialState);
    setToggle((prev) => {
      return { ...prev, [name]: true };
    });
  }
  return (
    <nav>
      <div
        className="navLogo"
        onClick={() => {
          handleToggle("Home");
        }}
      >
        <img src="./images/LOGO1.png" alt="" /> <h4>Admin</h4>
      </div>
      <ul>
        <li
          className={toggle.Home ? "active" : null}
          onClick={() => {
            handleToggle("Home");
          }}
        >
          Home
        </li>
        <li
          className={toggle.Advisory ? "active" : null}
          onClick={() => {
            handleToggle("Advisory");
          }}
        >
          News
        </li>
        <li
          className={toggle.Requests ? "active" : null}
          onClick={() => {
            handleToggle("Requests");
          }}
        >
          Requests
        </li>
        <li
          className={toggle.Forms ? "active" : null}
          onClick={() => {
            handleToggle("Forms");
          }}
        >
          Forms
        </li>
        <li
          className={toggle.FAQ ? "active" : null}
          name="FAQ"
          onClick={() => {
            handleToggle("FAQ");
          }}
        >
          FAQ
        </li>
        <li
          className={toggle.Settings ? "active" : null}
          name="Settings"
          onClick={() => {
            handleToggle("Settings");
          }}
        >
          Settings
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(AdminNav);
