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
    FAQ: false
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
      <h4 className="logo">Admin</h4>

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
          Advisory
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
        <li>Logout</li>
      </ul>
    </nav>
  );
}

export default withRouter(AdminNav);
