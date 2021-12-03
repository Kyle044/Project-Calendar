import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space, Button, Modal } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";

import Task from "../Components/TaskList";
import axios, { Axios } from "axios";
function InsertGoal(props) {
  const { TextArea } = Input;
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fileRef = useRef();
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
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
    Handler: "N/A",
    Status: "On Going"
  });
  useEffect(() => {
    console.log(state);
  }, [state]);

  const showModal = () => {
    setIsModalVisible(true);
    setIsGoalModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setState((prev) => {
      return { ...prev, Tasks: prev.Tasks.concat(task) };
    });
    setTask({
      Subject: "",
      Description: "",
      startDate: "",
      dueDate: "",
      Handler: "N/A",
      Status: "On Going"
    });
    setIsGoalModalVisible(true);
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

    // setIsGoalModalVisible(!isGoalModalVisible);
  };

  const handleCancelGoal = () => {
    setIsGoalModalVisible(false);
  };
  const { RangePicker } = DatePicker;
  function onChange(date, dateString) {
    setState((prev) => {
      return { ...prev, StartDate: date[0]._d, DueDate: date[1]._d };
    });
  }
  function onChangeTaskDate(date, dateString) {
    setTask((prev) => {
      return { ...prev, startDate: date[0]._d, dueDate: date[1]._d };
    });
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
  return (
    <div>
      <Button type="primary" onClick={showGoalModal}>
        Add Goal
      </Button>
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
            <RangePicker onChange={onChange} />
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
          <RangePicker onChange={onChangeTaskDate} />
        </Space>
        <br />
      </Modal>
    </div>
  );
}

export default InsertGoal;
