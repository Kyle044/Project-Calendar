import React, { useState, useEffect } from "react";
import axios from "axios";
import download from "../Functions/download";
import { Button } from "antd";
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
    <div>
      <h1>Form table</h1>

      <table className="Classtable">
        <tr>
          <th>Description</th>
          <th>Options</th>
        </tr>

        {state.map((form) => {
          return (
            <tr>
              <td>{form.Description}</td>
              <td>
                <Button
                  onClick={() => {
                    console.log(form.File);
                    download(
                      form.File.path.substr(16),
                      form.File.filename.substr(15)
                    );
                  }}
                >
                  File
                </Button>
                <Button
                  danger
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this form?"
                      )
                    ) {
                      axios
                        .delete(`${process.env.REACT_APP_KEY}/deleteForm`, {
                          data: { id: form._id }
                        })
                        .then((res) => {
                          axios
                            .get(`${process.env.REACT_APP_KEY}/getForm`)
                            .then((res) => {
                              setState(res.data.data);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          alert(res.data.msg);
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

export default FormTable;
