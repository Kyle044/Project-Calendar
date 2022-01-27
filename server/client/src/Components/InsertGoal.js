import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space, Button, Modal, notification, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Select, Empty } from "antd";
import validator from "validator";
import Task from "../Components/TaskList";
import axios, { Axios } from "axios";

function InsertGoal(props) {
  const { TextArea } = Input;
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fileRef = useRef();
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [stateDate, setStateDate] = useState(null);
  const [taskDate, setTaskDate] = useState(null);
  const [state, setState] = useState({
    Subject: "",
    Description: "",
    StartDate: "",
    DueDate: "",
    Status: "On Going",
    File: [],
    percentageComplete: 0,
    Tasks: [],
    Owner: props.Owner
  });
  const [task, setTask] = useState({
    Subject: "",
    Description: "",
    startDate: "",
    dueDate: "",
    Handler: "",
    Status: "On Going"
  });

  //FIXME:

  const [subAdmin, setSubAdmin] = useState(null);
  const getAdmins = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getSubadmin`)
      .then((res) => {
        setSubAdmin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    setIsGoalModalVisible(false);
  };
  //FIXME:
  const handleOk = () => {
    console.log(task);
    if (
      !task.Subject ||
      !task.Description ||
      !task.startDate ||
      !task.dueDate ||
      !task.Handler
    ) {
      message.error("Please Fill up All the fields");
    } else {
      setIsModalVisible(false);
      setState((prev) => {
        return { ...prev, Tasks: prev.Tasks.concat(task) };
      });
      setTaskDate(null);
      setTask((prev) => {
        return {
          Subject: "",
          Description: "",
          startDate: "",
          dueDate: "",
          Handler: prev.Handler,
          Status: "On Going"
        };
      });
      setIsGoalModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsGoalModalVisible(true);
  };

  const showGoalModal = () => {
    setIsGoalModalVisible(!isGoalModalVisible);
  };

  const handleOkGoal = (e) => {
    e.preventDefault();
    if (
      !state.Description ||
      !state.StartDate ||
      !state.DueDate ||
      !state.Subject
    ) {
      message.error(
        "Please fill up Description and Date and the Subject Section"
      );
    } else {
      submit().then((data) => {
        const files = data.file.map((file) => {
          return {
            FileName: file.filename,
            Directory: file.path,
            Size: file.size
          };
        });
        axios
          .post(`${process.env.REACT_APP_KEY}/insertGoal`, {
            Subject: state.Subject,
            Description: state.Description,
            StartDate: state.StartDate,
            DueDate: state.DueDate,
            Status: "On Going",
            File: files,
            percentageComplete: state.percentageComplete,
            Tasks: state.Tasks,
            Owner: props.Owner
          })
          .then((res) => {
            console.log(res.data);
            fileRef.current.value = null;
            setRefresh(!refresh);
          })
          .catch((err) => console.log(err));
        setStateDate(null);
        setState({
          Subject: "",
          Description: "",
          StartDate: "",
          DueDate: "",
          Status: "On Going",
          File: [],
          percentageComplete: 0,
          Tasks: [],
          Owner: props.Owner
        });
      });
    }

    // setIsGoalModalVisible(!isGoalModalVisible);
  };

  const handleCancelGoal = () => {
    setIsGoalModalVisible(false);
  };
  const { RangePicker } = DatePicker;
  function onChange(date, dateString) {
    setStateDate(date);
    if (date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date[0]._d < today) {
        openNotification(
          "The Date is Invalid",
          "the date must must be greater than or equal to the present date."
        );
        setStateDate([]);
      } else {
        setState((prev) => {
          return { ...prev, StartDate: date[0]._d, DueDate: date[1]._d };
        });
      }
    }
  }

  function onChangeTaskDate(date, dateString) {
    setTaskDate(date);
    if (date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date[0]._d < today) {
        openNotification(
          "The Date is Invalid",
          "the date must must be greater than or equal to the present date."
        );
        setTaskDate(null);
      } else {
        setTask((prev) => {
          return { ...prev, startDate: date[0]._d, dueDate: date[1]._d };
        });
      }
    }
  }

  function taskChange(e) {
    const { name, value } = e.target;
    setTask((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function fileChange(e) {
    setState((prev) => {
      return { ...prev, File: e.target.files };
    });
  }
  function deleteTask(taskz) {
    setState((prev) => {
      return {
        ...prev,
        Tasks: prev.Tasks.filter((task) => {
          return task != taskz;
        })
      };
    });
  }
  function goalChange(e) {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function submit() {
    if (
      !state.Description ||
      !state.StartDate ||
      !state.DueDate ||
      !state.Subject
    ) {
      message.error(
        "Please fill up Description and Date and the Subject Section"
      );
    } else {
      const formData = new FormData();
      for (let i = 0; i < state.File.length; i++) {
        formData.append("files", state.File[i]);
      }
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_KEY}/insertMultipleFile`,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: formData
      };
      return axios(config)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    console.log("refresh");
    axios
      .get(`${process.env.REACT_APP_KEY}/getGoal`)
      .then((res) => {
        props.setGoal(res.data.data);
        axios
          .get(`${process.env.REACT_APP_KEY}/getGoalCount`)
          .then((res) => {
            props.setGoalCount(res.data.data);
          })
          .catch((err) => {
            console.log("There was an error : " + err);
          });
      })
      .catch((err) => {
        console.log("There was an error : " + err);
      });
  }, [refresh]);
  const openNotification = (mess, des) => {
    notification.open({
      message: mess,
      description: des,
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  };
  const { Option } = Select;

  // TODO:
  function onChangeHandler(value) {
    setTask((prev) => {
      return { ...prev, Handler: value };
    });
  }
  function onSearchHandler(val) {}
  return (
    <div>
      <Button onClick={showGoalModal}>Add Goal</Button>
      <Modal
        title="Add Goal"
        visible={isGoalModalVisible}
        onOk={handleOkGoal}
        onCancel={handleCancelGoal}
        okText="Submit"
      >
        <form onSubmit={handleOkGoal}>
          <Space direction="vertical" size={12}>
            <Input
              placeholder="Subject"
              name="Subject"
              onChange={goalChange}
              value={state.Subject}
            />
            <TextArea
              placeholder="Description"
              rows={4}
              name="Description"
              onChange={goalChange}
              value={state.Description}
            />
            {/* {FIXME:} */}
            <RangePicker
              onChange={onChange}
              allowClear={false}
              value={stateDate}
            />
            <input
              ref={fileRef}
              type="file"
              id="files"
              name="files"
              multiple
              onChange={fileChange}
            />
            <Button
              type="dashed"
              onClick={() => {
                showModal();
              }}
              block
              icon={<PlusOutlined />}
            >
              Add field
            </Button>

            {state.Tasks.map((task) => {
              return <Task Task={task} Delete={deleteTask} />;
            })}
          </Space>
        </form>
      </Modal>
      <Modal
        title="Add Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" size={12}>
          <Input
            placeholder="Subject"
            name="Subject"
            value={task.Subject}
            onChange={taskChange}
          />
          <TextArea
            rows={4}
            name="Description"
            value={task.Description}
            onChange={taskChange}
          />
          <RangePicker onChange={onChangeTaskDate} value={taskDate} />
          {/* TODO: */}
          <Select
            showSearch
            placeholder="Select a Task Handler"
            optionFilterProp="children"
            onChange={onChangeHandler}
            onSearch={onSearchHandler}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {subAdmin ? (
              subAdmin.map((a) => {
                return (
                  <Option value={a._id} key={a._id}>
                    {a.Fullname}
                  </Option>
                );
              })
            ) : (
              <Empty />
            )}
          </Select>
          ,
        </Space>
        <br />
      </Modal>
    </div>
  );
}

export default InsertGoal;
