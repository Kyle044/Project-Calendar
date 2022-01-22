import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/requestPage/MessageForm.css";
function MessageForm(props) {
  let initialState = {
    Title: "",
    Description: "",
    File: []
  };
  const [message, setMessage] = useState(initialState);

  const [inputFile, setInputFile] = useState(null);

  const handleFile = (e) => {
    setInputFile(e.target.files);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < inputFile.length; i++) {
      formData.append("files", inputFile[i]);
    }
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_KEY}/insertMultipleFile`,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formData
    };

    axios(config)
      .then((res) => {
        setMessage((prev) => {
          return {
            ...prev,
            File: res.data.file
          };
        });

        axios
          .post(`${process.env.REACT_APP_KEY}/insertMessage`, {
            ...message,
            To: props.requestID.Sender,
            RequestID: props.requestID.Request
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setMessage((prev) => {
      return { ...prev, [name]: value };
    });
  }
  return (
    <div>
      <form action="" onSubmit={formSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="Title"
          onChange={handleChange}
          value={message.Title}
        />
        <label>Description</label>
        <textarea
          name="Description"
          id=""
          cols="20"
          rows="5"
          onChange={handleChange}
          value={message.Description}
        ></textarea>
        <label>Attachment</label>
        <input type="file" name="File" multiple id="" onChange={handleFile} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MessageForm;
