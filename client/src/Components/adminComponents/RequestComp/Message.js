import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import axios from "axios";
import "./request.css";
function Message({ id, Sender }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    Subject: "",
    Message: "",
    File: []
  });

  function upload() {
    const formData = new FormData();
    for (let i = 0; i < form.File.length; i++) {
      formData.append("files", form.File[i]);
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
  const showModal = () => {
    setModal(true);
  };
  const handleOk = (e) => {
    console.log(form);
    upload()
      .then((res) => {
        handleSubmit(e, res.file);
      })
      .catch((err) => {
        console.log(err);
      });
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleFileChange = (e) => {
    setForm((prev) => {
      return { ...prev, File: e.target.files };
    });
  };
  const handleSubmit = (e, file) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_KEY}/emailRequest`, {
        data: form,
        Sender: Sender,
        formData: file
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { TextArea } = Input;
  return (
    <div>
      <Button className="Owshee" onClick={showModal}>
        Email
      </Button>
      <Modal
        title="Message"
        visible={modal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="" className="mez" onSubmit={(e) => handleOk(e)}>
          <Input
            placeholder="Subject"
            onChange={(e) => {
              handleChange(e);
            }}
            value={form.Subject}
            name="Subject"
          />
          <TextArea
            rows={4}
            placeholder="Message"
            onChange={(e) => {
              handleChange(e);
            }}
            name="Message"
            value={form.Message}
          />
          <input
            type="file"
            onChange={(e) => handleFileChange(e)}
            name="File"
            multiple
          />
        </form>
      </Modal>
    </div>
  );
}

export default Message;
