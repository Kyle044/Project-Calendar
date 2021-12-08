import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/form.css";
import { Button, Input, Modal } from "antd";

function FileForm() {
  var initialState = {
    File: {},
    Description: ""
  };

  const [state, setState] = useState(initialState);
  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleFileChange = (e) => {
    setState((prev) => {
      return { ...prev, File: e.target.files[0] };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const formData = new FormData();
    formData.append("file", state.File);
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_KEY}/insertFile`,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formData
    };

    axios(config)
      .then((res) => {
        axios
          .post(`${process.env.REACT_APP_KEY}/insertForm`, {
            File: res.data.file,
            Description: state.Description
          })
          .then((res) => {
            alert(res.data.msg);
            setState(initialState);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div>
      <Button danger onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Form"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <input type="file" name="file" id="" onChange={handleFileChange} />
          <label htmlFor="">Description</label>
          <TextArea
            name="Description"
            value={state.Description}
            rows={4}
            onChange={handleChange}
          />
        </form>
      </Modal>
    </div>
  );
}

export default FileForm;
