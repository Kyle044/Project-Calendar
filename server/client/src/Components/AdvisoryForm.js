import React, { useState, useEffect } from "react";
import { Input, Modal, Button } from "antd";
import axios from "axios";
function AdvisoryForm({ setStates }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/insertAdvisory`, {
        data: state
      })
      .then((res) => {
        axios
          .get(`${process.env.REACT_APP_KEY}/getAdvisory`)
          .then((res) => {
            setStates(res.data.data);
            alert(res.data.msg);
          })
          .catch((err) => {
            console.log(err);
          });
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { TextArea } = Input;
  var initialState = {
    Description: ""
  };
  const [state, setState] = useState(initialState);
  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => {
      return { [name]: value };
    });
  }
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div>
      <Button onClick={showModal}>Add</Button>
      <Modal
        title="Advisory"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="">
          <TextArea
            rows={4}
            name="Description"
            value={state.Advisory}
            onChange={handleChange}
          />
        </form>
      </Modal>
    </div>
  );
}

export default AdvisoryForm;
