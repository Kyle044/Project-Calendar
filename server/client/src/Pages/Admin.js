import { Skeleton } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import OnGoingCalendar from "../Components/OnGoingCalendar";
import { verifyAdminToken } from "../Functions/api";
import FaqFrom from "../Components/FaqForm";
import { Modal, Button } from "antd";

import InsertGoal from "../Components/InsertGoal";

import FileForm from "../Components/FileForm";
import LeftPane from "../Components/adminNav/AdminNav";
import HomeComp from "../Components/adminComponents/HomeComp/Home";
import AdvisoryComp from "../Components/adminComponents/AdvisoryComp/Advisory";
import RequestComp from "../Components/adminComponents/RequestComp/Request";
import FormComp from "../Components/adminComponents/FormComp/Form";
import FAQComp from "../Components/adminComponents/FAQComp/FAQ";
import SettingsComp from "../Components/adminComponents/SettingsComp/Settings";
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
    if (localStorage.getItem("token")) {
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
          console.log(res.data.data);
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
    } else {
      history.push("/adminPortal");
    }
  }, []);

  var toggleState = {
    Home: false,
    Advisory: false,
    Requests: false,
    Forms: false,
    FAQ: false,
    Settings: false
  };
  const [toggle, setToggle] = useState({
    Home: true,
    Advisory: false,
    Requests: false,
    Forms: false,
    FAQ: false,
    Settings: false
  });
  function handleToggle(name) {
    setToggle(toggleState);
    setToggle((prev) => {
      return { ...prev, [name]: true };
    });
  }

  return (
    <div>
      {admin ? (
        <div>
          <div className="admen">
            <LeftPane masterToggle={handleToggle} Owner={admin} />

            <div className="rightPane">
              {/**
               * HOMEEEEEEEEEEEEEEEE
               */}
              {toggle.Home && goal ? (
                <HomeComp
                  request={request}
                  requestCount={requestCount}
                  goal={goal}
                  goalCount={goalCount}
                  setGoal={setGoal}
                  Owner={admin}
                  setGoalCount={setGoalCount}
                />
              ) : null}
              {/**
               * ADVISORYYYYYYYYYYYY
               */}
              {toggle.Advisory ? <AdvisoryComp admin={admin} /> : null}
              {/**
               * FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ
               */}
              {toggle.FAQ ? <FAQComp admin={admin} /> : null}
              {/**
               * FORMSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
               */}
              {toggle.Forms ? <FormComp admin={admin} /> : null}
              {/**
               * REQUESTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
               */}
              {toggle.Requests ? <RequestComp admin={admin} /> : null}
              {/**
               * SETTINGSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
               */}
              {toggle.Settings ? <SettingsComp admin={admin} /> : null}
            </div>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default withRouter(Admin);
