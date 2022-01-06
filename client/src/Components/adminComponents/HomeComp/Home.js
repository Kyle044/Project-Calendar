import React, { useState, useEffect } from "react";
import _ from "lodash";
import Card from "./Card";
import { Button, Input, Badge, Empty } from "antd";
import { Pie } from "@ant-design/charts";
import InsertGoal from "../../InsertGoal";
import OnGoingCalendar from "../../OnGoingCalendar";
import axios from "axios";
import "./home.css";
import validator from "validator";
import moment from "moment";
function Home({
  goal,
  goalCount,
  request,
  requestCount,
  setGoal,
  Owner,
  setGoalCount
}) {
  const [search, setSearch] = useState({ Search: "" });
  var completeCount = 0;
  var ongoingCount = 0;
  const { Search } = Input;
  _.forEach(goal, (g) => {
    if (g.Status == "Complete") {
      completeCount++;
    }
    if (g.Status == "On Going") {
      ongoingCount++;
    }
  });

  const data = [
    {
      type: "On Going",
      value: ongoingCount
    },
    {
      type: "Complete",
      value: completeCount
    }
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 18
      }
    },
    interactions: [
      {
        type: "element-selected"
      },
      {
        type: "element-active"
      }
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 12
        },
        content: `Goal : ${goalCount}`
      }
    }
  };
  var completereqCount = 0;
  var ongoingreqCount = 0;
  _.forEach(request, (r) => {
    if (r.Status == "Complete") {
      completereqCount++;
    }
    if (r.Status == "On Going") {
      ongoingreqCount++;
    }
  });
  const datae = [
    {
      type: "On Going",
      value: ongoingreqCount
    },
    {
      type: "Complete",
      value: completereqCount
    }
  ];
  const confige = {
    appendPadding: 10,
    data: datae,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 18
      }
    },
    interactions: [
      {
        type: "element-selected"
      },
      {
        type: "element-active"
      }
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 12
        },
        content: `Requests : ${requestCount}`
      }
    }
  };
  const onSearch = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSearch = () => {
    const { Search } = search;
    axios
      .post(`${process.env.REACT_APP_KEY}/searchGoal`, { search: Search })
      .then((res) => {
        setGoal(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [qoute, setQoute] = useState({
    author: "",
    text: ""
  });
  useEffect(() => {
    axios
      .get("https://type.fit/api/quotes")
      .then((res) => {
        setQoute(res.data[Math.floor(Math.random() * 10)]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [today, setToday] = useState(moment(new Date()).format("MMMM Do YYYY"));
  useEffect(() => {
    setToday(moment(new Date()).format("MMMM Do YYYY"));
  }, [today]);
  return (
    <div className="homeContainer">
      <section className="home1">
        <div className="dateContainer ">
          <h1>{today}</h1>
          <p>
            "{qoute ? `${qoute.text} - ${qoute.author}` : "Getting Qoutes"}"
          </p>
        </div>
        <div className="pieContainer">
          <Pie {...config} autoFit={true} />
          <Pie {...confige} autoFit={true} />
        </div>
      </section>
      <section className="home2">
        <OnGoingCalendar goal={goal} />
      </section>
      <section className="sec3">
        <div className="inputContainer">
          <div className="cont">
            <input
              type="text"
              name="Search"
              value={search.Search}
              placeholder="Search Here"
              onChange={onSearch}
            />
            <Button
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
            <InsertGoal Owner={Owner} setGoal={setGoal} />
            <Button
              onClick={() => {
                alert("Download Success");
              }}
            >
              Download Calendar
            </Button>
          </div>
        </div>
        <h4 className="headers">Goals</h4>
        {goal.length != 0 ? (
          <div className="cardContainer">
            {goal.map((g) => {
              return (
                <Card goal={g} setGoal={setGoal} setGoalCount={setGoalCount} />
              );
            })}
          </div>
        ) : (
          <Empty style={{ margin: "1px" }} />
        )}
      </section>
    </div>
  );
}

export default Home;
