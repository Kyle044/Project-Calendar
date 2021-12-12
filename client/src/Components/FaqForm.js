import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Input } from "antd";
import "../Css/Faq.css";
function FaqForm() {
  var initialState = {
    Question: "",
    Answer: ""
  };
  const [faq, setFaq] = useState(initialState);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/insertFAQ`, faq)
      .then((res) => {
        alert(res.data.msg);
        setFaq(initialState);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaq((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    console.log(faq);
  }, [faq]);
  return (
    <div>
      <Button danger onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Post a FAQ"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="">
          <label htmlFor="">Question</label>
          <Input
            className="input"
            type="text"
            name="Question"
            id=""
            value={faq.Question}
            onChange={handleChange}
          />
          <label htmlFor="">Answer</label>
          <Input
            className="input"
            type="text"
            name="Answer"
            id=""
            value={faq.Answer}
            onChange={handleChange}
          />
        </form>
      </Modal>
    </div>
  );
}

export default FaqForm;
