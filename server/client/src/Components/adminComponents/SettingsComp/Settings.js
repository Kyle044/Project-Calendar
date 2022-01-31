import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { verifyAdminToken } from "../../../Functions/api";
import { Button, Input, message, Modal, Empty } from "antd";
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
    edit: false,
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
  const handleSubmit = () => {
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
              message.success(res.data);
              setState(initialState);
              setIsModalVisible(false);
              getEmployee();
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
              message.success(res.data);
              setState(initialState);
              setIsModalVisible(false);
              getEmployee();
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
    handleSubmit();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [searchsStud, setSearchStud] = useState();
  const [searchsAdmin, setSearchAdmin] = useState();
  const handleChangeStudent = (e) => {
    setSearchStud(e.target.value);
  };
  const handleChangeAdmin = (e) => {
    setSearchAdmin(e.target.value);
  };

  const searchAdmin = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/searchAdmin`, {
        search: searchsAdmin
      })
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchStudent = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/searchStudent`, {
        search: searchsStud
      })
      .then((res) => {
        setStudent(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    axios
      .delete(`${process.env.REACT_APP_KEY}/deleteAdmin`, { data: { id: id } })
      .then((res) => {
        message.success(res.data);
        getEmployee();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteStudent = (id) => {
    axios
      .delete(`${process.env.REACT_APP_KEY}/deleteStud`, { data: { id: id } })
      .then((res) => {
        message.success(res.data);
        getStudent();
      })
      .catch((err) => {
        console.log(err);
      });
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
        <div
          className="logBtn"
          onClick={() => {
            setToggle({ add: true, edit: false });
            setIsModalVisible(true);
          }}
        >
          <h4>Add Admin</h4>
        </div>{" "}
        <div
          className="logBtn"
          onClick={() => {
            setToggle({ add: false, edit: true });
            setIsModalVisible(true);
          }}
        >
          <h4>Edit Account</h4>
        </div>{" "}
        <div
          className="logBtn"
          onClick={() => {
            handleLogout();
          }}
        >
          <h4>Log-out</h4>
        </div>
      </div>

      <section className="EmployeeContainer">
        <h2 className="aaa">Registered Admin</h2>
        <div className="optionCont aaa">
          <input
            type="text"
            name="Search"
            placeholder="Search Student #"
            onChange={handleChangeAdmin}
          />
          <Button
            onClick={() => {
              searchAdmin();
            }}
          >
            Search
          </Button>
        </div>
        {employee ? (
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
        ) : (
          <Empty />
        )}
      </section>

      <section className="StudentContain">
        <h2 className="aaa">Registered Student</h2>
        <div className="optionCont aaa">
          <input
            type="text"
            name="Search"
            placeholder="Search Student #"
            onChange={handleChangeStudent}
          />
          <Button
            onClick={() => {
              searchStudent();
            }}
          >
            Search
          </Button>
        </div>
        <table className="content-table">
          <thead>
            <tr>
              <th>School #</th>
              <th>Email</th>
              <th>Fullname</th>
              <th>Course</th>
              <th>Program</th>
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
                  <td>{e.Course}</td>
                  <td>{e.Year}</td>
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
        title={
          toggle.add ? "Add Admin" : toggle.edit ? "Edit Account" : "Not Set"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {" "}
        <div className="addContainer">
          <Input
            placeholder="Admin #"
            onChange={handleChange}
            name="SchoolIDNumber"
            value={state.SchoolIDNumber}
          />

          <Input
            placeholder="Email"
            onChange={handleChange}
            name="Email"
            value={state.Email}
          />

          <Input
            placeholder="Fullname"
            onChange={handleChange}
            name="FullName"
            value={state.FullName}
          />

          <Input
            placeholder="Password"
            onChange={handleChange}
            name="Password"
            value={state.Password}
            type="password"
          />

          <Input
            placeholder="Confirm Password"
            onChange={handleChange}
            name="ConfirmPassword"
            type="password"
            value={state.ConfirmPassword}
          />
        </div>
      </Modal>
    </div>
  );
}

export default withRouter(Settings);
