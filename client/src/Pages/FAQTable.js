import React, { useState, useEffect } from "react";
import "../Css/table.css";
import { Button } from "antd";
import axios from "axios";
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
    <div>
      <table className="Classtable">
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Options</th>
        </tr>
        {state.map((faq) => {
          return (
            <tr key={faq._id}>
              <td>{faq.Question}</td>
              <td>{faq.Answer}</td>
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
    </div>
  );
}

export default FAQTable;
