import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import Header from "../Components/studentdashComponents/header";
import Footer from "../Components/studentdashComponents/Footer";
import "../Css/adminPage/formtable.css";
function FormTable() {
  const [state, setState] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getForm`)
      .then((res) => {
        setState(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="MainContainer">
      <Header />
      <h1 className="HEADER">Form table</h1>

      <table className="Classtable">
        <tr>
        <th className="thName">Description</th>
        <th className="thOpt">Options</th>
        </tr>

        {state.map((form) => {
          return (
            <tr>
              <td className="tdDes">{form.Description}</td>
              <td>
                <Button
                  onClick={() => {
                    console.log(form.File);
                  }}
                >
                  File
                </Button>
                <Button
                  danger
                  onClick={() => {
                    axios
                      .delete(`${process.env.REACT_APP_KEY}/deleteForm`, {
                        data: { id: form._id }
                      })
                      .then((res) => {
                        console.log(res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
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

export default FormTable;
