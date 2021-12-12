import React, { useState, useEffect } from "react";
import { Input, Modal, Button } from "antd";
import axios from "axios";
function AdvisoryForm() {
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
        alert(res.data.msg);
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
      <Button danger onClick={showModal}>
        Add
      </Button>
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
