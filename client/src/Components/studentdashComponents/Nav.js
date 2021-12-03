import React, { useState, useEffect } from "react";
import "../../Css/student/Nav.css";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import validator from "validator";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import { verifyToken } from "../../Functions/api";
function Nav({ history }) {
  const [myData, setmyData] = useState();
  const [toggle, setToggle] = useState({ burger: false });
  const [arrayOfNotification, setArrayOfNotification] = useState([
    { notification: "Notification 1", key: "1" },
    { notification: "Notification 2", key: "2" },
    { notification: "Notification 3", key: "3" }
  ]);
  const isLoggedReducer = useSelector((state) => state.isLoggedReducer);

  function handleButtonClick(e) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }
  function handleMenuClick(e) {
    message.info("Click on menu items.");
    console.log("click", e.key);
  }
  let menu = (
    <Menu onClick={handleMenuClick}>
      {arrayOfNotification.map((el) => {
        return (
          <Menu.Item key={el.key} icon={<UserOutlined />}>
            {el.notification}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const token = localStorage.getItem("token");
  useEffect(() => {
    // setmyData(verifyToken(token));
    verifyToken(token).then((value) => {
      setmyData(value);
    });
  }, []);
  return (
    <div className="main">
      <h3>{myData ? myData.Fullname : "User"}</h3>

      <ul>
        <li className="notif">
          <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
            Notification
          </Dropdown.Button>
        </li>
        <li className="list">Log-out</li>
      </ul>
    </div>
  );
}

export default withRouter(Nav);
