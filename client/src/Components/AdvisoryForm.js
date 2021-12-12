import React, { useState } from "react";
import { Input, Modal, Button } from "antd";
function AdvisoryForm() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { TextArea } = Input;
  var initialState = {
    Advisory: ""
  };
  const [state, setState] = useState(initialState);
  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => {
      return { [name]: value };
    });
  }

  return (
    <div>
      <Button danger onClick={showModal}>
        Input Advisory
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
            name="Advisory"
            value={state.Advisory}
            onChange={handleChange}
          />
        </form>
      </Modal>
    </div>
  );
}

export default AdvisoryForm;
