import React, { useState, useEffect } from "react";
import "./advisory.css";
import { Button } from "antd";
import axios from "axios";
import AdvisoryTable from "../../../Pages/AdvisoryTable";
import AdvisoryForm from "../../AdvisoryForm";
function Advisory() {
  var initialState = [];
  const [state, setState] = useState(initialState);
  const [search, setSearch] = useState("");
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

  const onSearch = (e) => {
    setSearch(e.target.value);
  };
  const searchTrigger = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/searchAdvisory`, { search: search })
      .then((res) => {
        console.log(res.data);
        setState(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="table">
      <div className="heads">
        <h2>Advisory Table</h2>
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
          <AdvisoryForm setStates={setState} />
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
                          .delete(
                            `${process.env.REACT_APP_KEY}/deleteAdvisory`,
                            {
                              data: { id: advisory._id }
                            }
                          )
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
        </tbody>
      </table>
    </div>
  );
}

export default Advisory;
