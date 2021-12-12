import React, { useState, useEffect } from "react";
import axios from "axios";
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
    </div>
  );
}

export default FormTable;
