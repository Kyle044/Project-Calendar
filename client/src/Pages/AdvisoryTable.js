import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import Header from "../Components/studentdashComponents/header";
import Footer from "../Components/studentdashComponents/Footer";
import "../Css/adminPage/advisory.css";
function AdvisoryTable() {
  var initialState = [];
  const [state, setState] = useState(initialState);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAdvisory`)
      .then((res) => {
        setState(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="MainContainer">
      <h1 className="HEADER">Advisory Table</h1>

      <table className="Classtable">
        <tr>
          <th className="thName">Description</th>
          <th className="thOpt">Options</th>
        </tr>
        {state.map((advisory) => {
          return (
            <tr>
              <td className="tdDes">{advisory.Description}</td>
              <td>
                <Button
                  danger
                  onClick={() => {
                    if (
                      window.confirm(
                        "are you sure you want to delete this advisory"
                      )
                    ) {
                      axios
                        .delete(`${process.env.REACT_APP_KEY}/deleteAdvisory`, {
                          data: { id: advisory._id }
                        })
                        .then((res) => {
                          alert(res.data.msg);
                          axios
                            .get(`${process.env.REACT_APP_KEY}/getAdvisory`)
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
                    } else {
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

export default AdvisoryTable;
