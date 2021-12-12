import { Skeleton } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import OnGoingCalendar from "../Components/OnGoingCalendar";
import { verifyAdminToken } from "../Functions/api";
import FaqFrom from "../Components/FaqForm";
import { Modal, Button } from "antd";
import { Pie } from "@ant-design/charts";
import InsertGoal from "../Components/InsertGoal";
import _ from "lodash";
import FileForm from "../Components/FileForm";
import "../Css/adminPage/admin.css";
import AdminCard from "../Components/CardAdmin";
function Admin({ history }) {
  const [admin, setAdmin] = useState(null);
  const [request, setRequest] = useState();
  const [requestCount, setRequestCount] = useState();
  const [goal, setGoal] = useState();
  const [goalCount, setGoalCount] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    /**
     * get Admin Info
     */
    axios
      .get(`${process.env.REACT_APP_KEY}/protected`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then((res) => {
        setAdmin(res.data);
      })

      .catch((err) => {
        console.log(err);
      });

    /**
     *  Goal Count
     */
    axios
      .get(`${process.env.REACT_APP_KEY}/getGoalCount`)
      .then((res) => {
        setGoalCount(res.data.data);
      })
      .catch((err) => {
        console.log("There was an error : " + err);
      });
    /**
     *  Request Count
     */
    axios
      .get(`${process.env.REACT_APP_KEY}/getRequestCount`)
      .then((res) => {
        setRequestCount(res.data.data);
      })
      .catch((err) => {
        console.log("There was an error : " + err);
      });

    /**
     * Get Goal
     */
    axios
      .get(`${process.env.REACT_APP_KEY}/getGoal`)
      .then((res) => {
        setGoal(res.data.data);
      })
      .catch((err) => {
        console.log("There was an error : " + err);
      });

    /**
     * Get Request
     */
    axios
      .get(`${process.env.REACT_APP_KEY}/getRequest`)
      .then((res) => {
        setRequest(res.data.data);
      })
      .catch((err) => {
        console.log("There was an error : " + err);
      });
  }, []);

  var completeCount = 0;
  var ongoingCount = 0;

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
  useEffect(() => {
    console.log("goal was updated");
  }, [goal]);
  return (
    <div>
      {admin ? (
        <div>
          <div className="chartDiv">
            <div className="adminContainer">
              <h1>Hello Admin</h1>
              <p>Good Morning and have a nice day!</p>
            </div>
            <Pie {...config} autoFit={true} />
            <Pie {...confige} autoFit={true} />
          </div>
          <AdminCard setGoal={setGoal} setGoalCount={setGoalCount} />
          <div className="schedDiv">
            <OnGoingCalendar goal={goal} />
          </div>

          <div></div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default withRouter(Admin);
