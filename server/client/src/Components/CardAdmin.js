import React from "react";
import FaqForm from "./FaqForm";

import ".././Css/CardAdmin.css";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import InsertGoal from "./InsertGoal";
import AdvisoryForm from "./AdvisoryForm";
function CardAdmin({ setGoalCount, setGoal, history }) {
  return (
    <div>
      <div className="section3">
        <div className="card">
          <div className="cardHeader">
            <img src="./images/document.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Goal Schedule</h3>
          </div>
          <div className="cardBtn">
            <InsertGoal setGoal={setGoal} setGoalCount={setGoalCount} />
          </div>
        </div>
        <div className="card">
          <div className="cardHeader">
            <img src="./images/light-bulb.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Requests</h3>
          </div>
          <div className="cardBtn">
            <Button
              danger
              onClick={() => {
                history.push("/RequestPage");
              }}
            >
              Preview
            </Button>
          </div>
        </div>
        <div className="card">
          <div className="cardHeader">
            <img src="./images/downloadfile.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Request & Goal History</h3>
          </div>
          <div className="cardBtn">
            <Button danger>Download</Button>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <img src="./images/school.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Post Advisory</h3>
          </div>
          <div className="cardBtn">
            <AdvisoryForm />
            <Button
              onClick={() => {
                history.push("/advisoryTable");
              }}
            >
              Preview
            </Button>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <img src="./images/guide.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Post Form</h3>
          </div>
          <div className="cardBtn">
            <Button
              onClick={() => {
                history.push("/formTable");
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
            <h3>Post Frequently Asked Question</h3>
          </div>
          <div className="cardBtn">
            <FaqForm />
            <Button
              danger
              onClick={() => {
                history.push("/FAQTable");
              }}
            >
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CardAdmin);
