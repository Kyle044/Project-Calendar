import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
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
    <div>
      <h1>Advisory Table</h1>

      <table className="Classtable">
        <tr>
          <th>Description</th>
          <th>Options</th>
        </tr>
        {state.map((advisory) => {
          return (
            <tr>
              <td>{advisory.Description}</td>
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
