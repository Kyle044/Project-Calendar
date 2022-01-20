import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { verifyAdminToken } from "../../../Functions/api";
import "./setting.css";
function Settings({ history }) {
  const initialState = {
    Email: "",
    Password: "",
    ConfirmPassword: "",
    FullName: "",
    SchoolIDNumber: ""
  };

  const [toggle, setToggle] = useState({
    edit: true,
    add: false
  });

  const [state, setState] = useState(initialState);
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log-out?")) {
      localStorage.removeItem("token");
      history.push("/adminPortal");
    } else {
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.ConfirmPassword != state.Password) {
      alert("The Password does not match.");
    } else {
      if (toggle.add) {
        if (
          state.Email &&
          state.Password &&
          state.FullName &&
          state.SchoolIDNumber
        ) {
          axios
            .post(`${process.env.REACT_APP_KEY}/register`, state)
            .then((res) => {
              alert(res.data.msg);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("Please fill up all the fields");
        }
      } else {
        verifyAdminToken(localStorage.getItem("token")).then((user) => {
          axios
            .post(`${process.env.REACT_APP_KEY}/updateAdmin`, {
              ...state,
              id: user._id
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      }
    }
  };
  return (
    <div className="masterSettings">
      <div className="optionContainer">
        <div className="optionheader">
          <h4>Options</h4>
        </div>
        <div
          className="adminoption"
          onClick={() => {
            setToggle({ edit: true, add: false });
          }}
        >
          <h4>Edit Account</h4>
        </div>
        <div
          className="adminoption"
          onClick={() => {
            setToggle({ edit: false, add: true });
          }}
        >
          <h4>Add Admin</h4>
        </div>
        <div
          className="adminoption"
          onClick={() => {
            handleLogout();
          }}
        >
          <h4>Log-out</h4>
        </div>
      </div>

      <div className="settingContainer">
        <form action="" className="editForm" onSubmit={handleSubmit}>
          {toggle.edit ? (
            <h4 className="headers">Edit Account</h4>
          ) : (
            <h4 className="headers">Add Account</h4>
          )}
          <label>Email</label>
          <input
            type="text"
            value={state.Email}
            name="Email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            value={state.Password}
            name="Password"
            onChange={handleChange}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={state.ConfirmPassword}
            name="ConfirmPassword"
            onChange={handleChange}
          />
          <label>SchoolIDNumber</label>
          <input
            type="text"
            value={state.SchoolIDNumber}
            name="SchoolIDNumber"
            onChange={handleChange}
          />
          <label>Fullname</label>
          <input
            type="text"
            value={state.FullName}
            name="FullName"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Settings);
