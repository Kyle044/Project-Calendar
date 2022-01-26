import React from "react";
import "./verticalcard.css";
import { withRouter } from "react-router-dom";
function VerticalCard({ history }) {
  return (
    <div className="masterVerCard">
      <div
        className="verCard"
        onClick={() => {
          history.push("/Request");
        }}
      >
        <h4>Online Request</h4>
        <img src="./images/document.png" alt="" />
      </div>
      <div
        className="verCard"
        onClick={() => {
          history.push("/FormStudPage");
        }}
      >
        <h4>Forms To Download</h4>
        <img src="./images/downloadfile.png" alt="" />
      </div>
      <div
        className="verCard"
        onClick={() => {
          history.push("/appHistory");
        }}
      >
        <h4>Appointment History</h4>
        <img src="./images/cabinet.png" alt="" />
      </div>
    </div>
  );
}

export default withRouter(VerticalCard);
