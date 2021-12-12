import React, { useState, useEffect } from "react";
import { Input, Skeleton } from "antd";
import axios from "axios";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { verifyToken } from "../Functions/api";
import "../Css/requestPage/requestform.css";
import Footer from "../Components/studentdashComponents/Footer";
function Request() {
  const { TextArea } = Input;

  const [state, setstate] = useState({
    description: "",
    title: "",
    sender: "",
    file: []
  });
  function formSubmit(e) {
    e.preventDefault();
    if (state.file.length != 0) {
      const formData = new FormData();
      for (let i = 0; i < state.file.length; i++) {
        formData.append("files", state.file[i]);
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
          if (localStorage.getItem("token")) {
            axios
              .post(`${process.env.REACT_APP_KEY}/insertRequest`, {
                ...state,
                file: res.data.file
              })
              .then((res) => {
                console.log(res.data);
                alert("The request is Succesfull");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert("The file is fail to save in database");
          }

          console.log("file is saved");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please Attach a Identification ID and a Optional File");
    }
  }
  function fileChange(e) {
    setstate((prev) => {
      return { ...prev, file: e.target.files };
    });
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setstate((prev) => {
      return { ...prev, [name]: value };
    });
  }
  useEffect(() => {
    verifyToken(localStorage.getItem("token"))
      .then((res) => {
        console.log(res);
        setstate((prev) => {
          return { ...prev, sender: res };
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="mainContainer">
      {state.sender ? (
        <div className="formdiv">
          <h2 className="headerTitle">
            Request includes the validation of school number so it is required
            to send a picture of an Identification Card.
          </h2>
          <form
            onSubmit={(e) => {
              formSubmit(e);
            }}
          >
            <label for="title" style={{fontSize:"1rem", fontWeight:"bold"}}>Title</label>
            <Input id="title" name="title" onChange={handleChange} />
            <label for="description" style={{fontSize:"1rem", fontWeight:"bold"}}>Description</label>
            <Input
            style={{height:"120px"}}
              id="description"
              name="description"
              onChange={handleChange}
            />
            <label for="files">Select files:</label>
            <input
              type="file"
              id="files"
              name="files"
              multiple
              onChange={fileChange}
            />
            <button type="submit" 
            style={{width:"150px", margin:"auto"
            ,fontSize:"1.1rem", borderRadius:"30px",padding:"5px 0px",
            backgroundColor:"#FF5C58",border:"1px solid black",marginBottom:"1rem"}}>Submit</button>
          </form>
        </div>
      ) : (
        <Skeleton />
      )}
      
      <Footer />
      
    </div>
  );
}

export default Request;
