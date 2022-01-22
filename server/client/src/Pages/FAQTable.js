import React, { useState, useEffect } from "react";
import "../Css/table.css";
import { Button } from "antd";
import axios from "axios";

import Header from "../Components/studentdashComponents/header";
import Footer from "../Components/studentdashComponents/Footer";
import "../Css/adminPage/faqtable.css";

function FAQTable() {
  var initialState = [];
  const [state, setState] = useState(initialState);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getFAQ`)
      .then((res) => {
        setState(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteFAQ(ids) {
    axios
      .delete(`${process.env.REACT_APP_KEY}/deleteFAQ`, {
        data: {
          id: ids
        }
      })
      .then((res) => {
        alert(res.data.msg);
        axios
          .get(`${process.env.REACT_APP_KEY}/getFAQ`)
          .then((res) => {
            setState(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="MainContainer">
      <h1 className="HEADER">FAQ Preview</h1>
    </div>
  );
}

export default FAQTable;
