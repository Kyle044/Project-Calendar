import React, { useState, useEffect } from "react";
import { Input, Modal, Button } from "antd";
import axios from "axios";
function AdvisoryForm({ setStates }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    if (state.Description && state.Subject && state.file) {
      if (
        state.file[0].name.split(".").pop() == "jpg" ||
        state.file[0].name.split(".").pop() == "png"
      ) {
        const formDataz = new FormData();
        formDataz.append("file", state.file[0]);
        var config = {
          method: "post",
          url: `${process.env.REACT_APP_KEY}/insertFile`,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formDataz
        };
        axios(config)
          .then((res) => {
            const { file } = res.data;
            axios
              .post(`${process.env.REACT_APP_KEY}/insertAdvisory`, {
                Subject: state.Subject,
                Description: state.Description,
                Files: {
                  FileName: file.filename,
                  Directory: file.path,
                  Size: file.size
                }
              })
              .then((res) => {
                alert(res.data.msg);
                axios
                  .get(`${process.env.REACT_APP_KEY}/getAdvisory`)
                  .then((res) => {
                    setStates(res.data.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Please Input a JPG or PNG Photo.");
      }
    } else {
      alert("Please Fill up all the fields");
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleFileChange = (e) => {
    setState((prev) => {
      return { ...prev, file: e.target.files };
    });
  };
  const { TextArea } = Input;
  var initialState = {
    Subject: "",
    Description: "",
    file: ""
  };
  const [state, setState] = useState(initialState);
  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div>
      <Button onClick={showModal}>Add</Button>
      <Modal
        title="Post a News"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="">
          <label>Title</label>
          <Input
            type="text"
            name="Subject"
            value={state.Subject}
            onChange={handleChange}
          />
          <label>Description</label>
          <TextArea
            rows={4}
            name="Description"
            value={state.Description}
            onChange={handleChange}
          />
          <label>Attach Picture</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </form>
      </Modal>
    </div>
  );
}

export default AdvisoryForm;
