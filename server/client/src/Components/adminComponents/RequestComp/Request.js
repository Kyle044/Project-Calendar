import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import "./request.css";
import axios from "axios";
import Message from "./Message";
import { Empty } from "antd";
import download from "../../../Functions/download";
function Request({ admin }) {
  const [request, setRequest] = useState(null);

  const [toggleLoad, setToggleLoad] = useState({ mark: false, id: 0 });
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/searchRequest`, { search: search })
      .then((res) => {
        setRequest(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  const getRequest = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getRequest`)
      .then((res) => {
        console.log(res.data.data);
        setRequest(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPromiseRequest = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getRequest`)
      .then((res) => {
        setRequest(res.data.data);
        setToggleLoad((prev) => {
          return { ...prev, mark: false };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRequest();
  }, []);
  const handleMark = (id) => {
    setToggleLoad((prev) => {
      return { ...prev, mark: true };
    });
    axios
      .post(`${process.env.REACT_APP_KEY}/markRequestDone`, { id: id })
      .then((res) => {
        console.log("gumagana");
        getPromiseRequest();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this thing into the database?"
      )
    ) {
      axios
        .delete(`${process.env.REACT_APP_KEY}/deleteRequest`, {
          data: { id: id }
        })
        .then((res) => {
          console.log(res.data);
          getRequest();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };
  const handleMessage = (id) => {
    console.log(id);
  };
  const handleRejection = (id) => {
    if (window.confirm("Are you sure you want to reject the request?")) {
      axios
        .post(`${process.env.REACT_APP_KEY}/rejectRequest`, { id: id })
        .then((r) => {
          alert("Sucessfully Rejected");
          getRequest();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState({
    Auth: "",
    Course: "",
    Year: "",
    Email: "",
    Fullname: "",
    Password: "",
    SchoolIDNumber: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    _id: ""
  });
  const showModal = (data) => {
    setUser(data);
    setTimeout(() => {
      setIsModalVisible(true);
    }, 200);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="table">
      <div className="heads">
        <h2>Pending Request</h2>
        <div className="optionCont">
          <input
            type="text"
            name="Search"
            placeholder="Search Student #"
            value={search}
            onChange={searchChange}
          />
          <Button
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <table className="content-table">
        <thead>
          <tr>
            <th>Student #</th>
            <th>Request</th>
            <th>Description</th>
            <th>Program</th>
            <th>ID</th>
            <th>Status</th>
            <th>Appointment</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {request ? (
            request.map((r) => {

              if (r.Status == "On Going") {
                return (
                  <tr key={r._id}>
                    <td
                      className="yellowBtn"

              
                    onClick={() => {
                      showModal(r.Sender);
                    }}
                  >
                    {r.Sender.SchoolIDNumber}
                  </td>
                  <td>
                    {r.Title.map((t) => {
                      return <p>{t},</p>;
                    })}
                  </td>
                  <td>{r.Description}</td>
                  <td>{r.Program}</td>
                  <td>
                    <Button
                      onClick={() => {
                        download(r.File[0].path.substr(14), r.File[0].filename);
                      }}
                    >
                      File
                    </Button>
                  </td>
                  <td>{r.Status}</td>
                  <td>{new Date(r.Appointment.Date).toDateString()}</td>
                  <td className="Opt">
                    <Button
                      id="shet"

                      onClick={() => {
                        showModal(r.Sender);
                      }}
                    >
                      {r.Sender.SchoolIDNumber}
                    </td>
                    <td>
                      {r.Title.map((t) => {
                        return <p>{t},</p>;
                      })}
                    </td>
                    <td>{r.Description}</td>
                    <td>{r.Program}</td>
                    <td>
                      <Button
                        onClick={() => {
                          download(
                            r.File[0].path.substr(14),
                            r.File[0].filename
                          );
                        }}
                      >
                        File
                      </Button>
                    </td>

                    <td>{r.Status}</td>
                    <td>{new Date(r.Appointment.Date).toDateString()}</td>
                    <td className="Opt">
                      <Button
                        id="shet"
                        onClick={() => {
                          setToggleLoad((prev) => {
                            return { ...prev, id: r._id };
                          });
                          handleMark(r._id);
                        }}
                        loading={
                          toggleLoad.id == r._id ? toggleLoad.mark : false
                        }
                      >
                        Mark As Done
                      </Button>
                      <Button
                        onClick={() => {
                          handleRejection(r._id);
                        }}
                      >
                        Reject
                      </Button>
                      <Message id={r._id} Sender={r.Sender} id="shet" />
                      {admin.Auth == "subadmin" ? null : (
                        <Button
                          id="shet"
                          danger
                          onClick={() => {
                            handleReject(r._id);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              }
            })
          ) : (
            <Empty />
          )}
        </tbody>
      </table>
      <hr />
      <div className="heads">
        <h2>Rejected Requests</h2>
      </div>

      <table className="content-table">
        <thead>
          <tr>
            <th>Student #</th>
            <th>Request</th>
            <th>Description</th>

            <th>ID</th>
            <th>Status</th>
            <th>Appointment</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {request ? (
            request.map((r) => {
              if (r.Status == "Rejected") {
                return (
                  <tr key={r._id}>
                    <td
                      className="yellowBtn"
                      onClick={() => {
                        showModal(r.Sender);
                      }}
                    >
                      {r.Sender.SchoolIDNumber}
                    </td>
                    <td>
                      {r.Title.map((t) => {
                        return <p>{t},</p>;
                      })}
                    </td>
                    <td>{r.Description}</td>

                    <td>
                      <Button
                        onClick={() => {
                          download(
                            r.File[0].path.substr(14),
                            r.File[0].filename
                          );
                        }}
                      >
                        File
                      </Button>
                    </td>

                    <td>{r.Status}</td>
                    <td>{new Date(r.Appointment.Date).toDateString()}</td>
                    <td className="Opt">
                      <Button
                        id="shet"
                        onClick={() => {
                          setToggleLoad((prev) => {
                            return { ...prev, id: r._id };
                          });
                          handleMark(r._id);
                        }}
                        loading={
                          toggleLoad.id == r._id ? toggleLoad.mark : false
                        }
                      >
                        Mark As Done
                      </Button>
                      <Button
                        onClick={() => {
                          handleRejection(r._id);
                        }}
                      >
                        Reject
                      </Button>
                      <Message id={r._id} Sender={r.Sender} id="shet" />
                      {admin.Auth == "subadmin" ? null : (
                        <Button
                          id="shet"
                          danger
                          onClick={() => {
                            handleReject(r._id);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              }
            })
          ) : (
            <Empty />
          )}
        </tbody>
      </table>

      <div className="heads">
        <h2>Complete Requests</h2>
      </div>

      <table className="content-table">
        <thead>
          <tr>
            <th>Student #</th>
            <th>Request</th>
            <th>Description</th>

            <th>ID</th>
            <th>Status</th>
            <th>Appointment</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {request ? (
            request.map((r) => {
              if (r.Status == "Done") {
                return (
                  <tr key={r._id}>
                    <td
                      className="yellowBtn"
                      onClick={() => {
                        showModal(r.Sender);
                      }}
                    >
                      {r.Sender.SchoolIDNumber}
                    </td>
                    <td>
                      {r.Title.map((t) => {
                        return <p>{t},</p>;
                      })}
                    </td>
                    <td>{r.Description}</td>

                    <td>
                      <Button
                        onClick={() => {
                          download(
                            r.File[0].path.substr(14),
                            r.File[0].filename
                          );
                        }}
                      >
                        File
                      </Button>
                    </td>

                    <td>{r.Status}</td>
                    <td>{new Date(r.Appointment.Date).toDateString()}</td>
                    <td className="Opt">
                      <Button
                        id="shet"
                        onClick={() => {
                          setToggleLoad((prev) => {
                            return { ...prev, id: r._id };
                          });
                          handleMark(r._id);
                        }}
                        loading={
                          toggleLoad.id == r._id ? toggleLoad.mark : false
                        }
                      >
                        Mark As Done
                      </Button>
                      <Button
                        onClick={() => {
                          handleRejection(r._id);
                        }}
                      >
                        Reject
                      </Button>
                      <Message id={r._id} Sender={r.Sender} id="shet" />
                      {admin.Auth == "subadmin" ? null : (
                        <Button
                          id="shet"
                          danger
                          onClick={() => {
                            handleReject(r._id);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              }
            })
          ) : (
            <Empty />
          )}
        </tbody>
      </table>
      <Modal
        title="Student Description"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {user ? (
          <div className="userData">
            <h4>School # : {user.SchoolIDNumber}</h4>
            <h4>Full Name : {user.Fullname}</h4>
            <h4>Email: {user.Email}</h4>
            <h4>Course: {user.Course}</h4>
            <h4>Year Level/Program: {user.Year}</h4>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default Request;
