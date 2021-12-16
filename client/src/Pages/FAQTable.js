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
    <Header />
    <h1 className="HEADER">FAQ Preview</h1>
      <table className="Classtable">
        <tr>
        <th className="thName">Question</th>
          <th className="thans">Answer</th>
          <th className="thOpt">Options</th>
        </tr>
        {state.map((faq) => {
          return (
            <tr key={faq._id}>
              <td className="tdDes">{faq.Question}</td>
              <td className="tdDes">{faq.Answer}</td>
              <td>
                <Button
                  danger
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete")) {
                      // Save it!
                      deleteFAQ(faq._id);
                    } else {
                      // Do nothing!
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
      <Footer />
    </div>
  );
}

export default FAQTable;
