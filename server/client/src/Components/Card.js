import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
function Card({ history }) {
  return (
    <div className="section3">
      <div className="card">
        <div className="cardHeader">
          <img src="./images/document.png" alt="" />
        </div>
        <div className="cardDescript">
          <h3>Online Request Student Records</h3>
        </div>
        <div className="cardBtn">
          <Button
            danger
            onClick={() => {
              history.push("/Request");
            }}
          >
            Request
          </Button>
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <img src="./images/downloadfile.png" alt="" />
        </div>
        <div className="cardDescript">
          <h3>Forms To Download</h3>
        </div>
        <div className="cardBtn">
          <Button
            danger
            onClick={() => {
              history.push("/FormStudPage");
            }}
          >
            Preview
          </Button>
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <img src="./images/cabinet.png" alt="" />
        </div>
        <div className="cardDescript">
          <h3>Appointment History</h3>
        </div>
        <div className="cardBtn">
          <Button
            danger
            onClick={() => {
              history.push("/appHistory");
            }}
          >
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Card);
