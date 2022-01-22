import React, { useState, useEffect } from "react";
import "./faq.css";
import { Button } from "antd";
import FAQTable from "../../../Pages/FAQTable";
import axios from "axios";
import FAQForm from "../../FaqForm";
function FAQ() {
  var initialState = [];
  const [state, setState] = useState(initialState);
  const [search, setSearch] = useState("");
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
  const onSearch = (e) => {
    setSearch(e.target.value);
  };
  const searchTrigger = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/searchFAQ`, { search: search })
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
        <h2>Frequently Asked Question Table</h2>
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
          <FAQForm setStates={setState} />
        </div>
      </div>

      <table className="content-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {" "}
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
          })}{" "}
        </tbody>
      </table>
    </div>
  );
}

export default FAQ;
