import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { verifyAdminToken } from "../../../Functions/api";
import { Button, Input, Modal } from "antd";
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
            .post(`${process.env.REACT_APP_KEY}/subAdmin`, state)
            .then((res) => {
              alert(res.data);
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authentication, setAuthentication] = useState({
    Email: "",
    Password: ""
  });
  const handleOk = () => {
    console.log(authentication);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //FIXME:
  const [employee, setEmployee] = useState([]);
  const [student, setStudent] = useState([]);
  const getEmployee = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getSubadmin`)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteEmployee = (id) => {
    console.log(id);
  };

  const deleteStudent = (id) => {
    console.log(id);
  };
  const getStudent = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAllStudent`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEmployee();
    getStudent();
  }, []);
  return (
    <div className="masterSettings ">
      <div className="smallHeader">
        <div className="logBtn">
          <h4>Add Admin</h4>
        </div>{" "}
        <div className="logBtn">
          <h4>Log-out</h4>
        </div>
      </div>

      <section className="EmployeeContainer">
        <h2 className="aaa">Registered Admin</h2>
        <div className="optionCont aaa">
          <input type="text" name="Search" placeholder="Search Student #" />
          <Button>Search</Button>
        </div>
        <table className="content-table">
          <thead>
            <tr>
              <th>School #</th>
              <th>Email</th>
              <th>Fullname</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>
            {employee.map((e) => {
              return (
                <tr>
                  <td>{e.SchoolIDNumber}</td>
                  <td>{e.Email}</td>
                  <td>{e.Fullname}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setIsModalVisible(true);
                      }}
                    >
                      Approve Admin
                    </Button>
                    <Button
                      danger
                      onClick={() => {
                        deleteEmployee(e._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="StudentContain">
        <h2 className="aaa">Registered Student</h2>
        <div className="optionCont aaa">
          <input type="text" name="Search" placeholder="Search Student #" />
          <Button>Search</Button>
        </div>
        <table className="content-table">
          <thead>
            <tr>
              <th>School #</th>
              <th>Email</th>
              <th>Fullname</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>
            {student.map((e) => {
              return (
                <tr>
                  <td>{e.SchoolIDNumber}</td>
                  <td>{e.Email}</td>
                  <td>{e.Fullname}</td>
                  <td>
                    <Button
                      danger
                      onClick={() => {
                        deleteStudent(e._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <Modal
        title="Authentication"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label htmlFor="">Email</label>
        <input type="text" />
        <label htmlFor="">Password</label>
        <input type="password" />
      </Modal>
    </div>
  );
}

export default withRouter(Settings);
