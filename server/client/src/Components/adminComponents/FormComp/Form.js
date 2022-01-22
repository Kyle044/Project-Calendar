import React, { useState, useEffect } from "react";
import "./form.css";
import FileForm from "../../FileForm";
import { Button } from "antd";
import download from "../../../Functions/download";
import axios from "axios";
function Form() {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
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
  const onSearch = (e) => {
    setSearch(e.target.value);
  };
  const searchTrigger = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/searchForm`, { search: search })
      .then((res) => {
        setState(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addTrigger = () => {
    alert("Add something");
  };
  return (
    <div className="table">
      <div className="heads">
        <h2>Forms Table</h2>
        <div className="optionCont">
          <input
            type="text"
            name="Search"
            value={search}
            placeholder="Search Here"
            onChange={onSearch}
          />
          <Button
            onClick={() => {
              searchTrigger();
            }}
          >
            Search
          </Button>
          <FileForm setStates={setState} />
        </div>
      </div>
      <table className="content-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {state.map((form) => {
            return (
              <tr>
                <td>{form.Description}</td>
                <td>
                  <Button
                    onClick={() => {
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
        </tbody>
      </table>
    </div>
  );
}

export default Form;
