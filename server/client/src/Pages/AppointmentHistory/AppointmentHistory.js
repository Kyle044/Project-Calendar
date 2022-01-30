import React, { useState, useEffect } from "react";
import "./appointmenthistory.css";
import Header from "../../Components/studentdashComponents/header";
import Footer from "../../Components/studentdashComponents/Footer";
import { verifyToken } from "../../Functions/api";
import { Skeleton } from "antd";
import axios from "axios";
import moment from "moment";
import Card from "../../Components/Card";
import VerticalCard from "../../Components/verticalCard/VerticalCard";
function AppointmentHistory() {
  const [request, setRequest] = useState(null);

  const getUserRequest = (id) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/getUserRequest`, { id: id })
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    verifyToken(localStorage.getItem("token"))
      .then((token) => {
        getUserRequest(token._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="appMaster">
      <Header />
      <h2 className="formsto">The Appointment History</h2>
      <div className="appBody">
        {request ? (
          <table className="content-table ashzz">
            <thead>
              <caption>
                <caption className="table-title">
                  {/* <h4>The Appointment History</h4> */}
                </caption>
              </caption>
              <tr>
                <th>Request</th>
                <th>Appointment</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {request.map((r) => {
                return (
                  <tr>
                    <th>
                      {r.Title.map((t) => {
                        return `${t} , `;
                      })}{" "}
                    </th>
                    <th>
                      {new Date(r.Appointment.Date).toDateString()} From{" "}
                      {moment(r.Appointment.Time.From, "HH:mm:ss").format(
                        "h:mm A"
                      )}{" "}
                      To{" "}
                      {moment(r.Appointment.Time.To, "HH:mm:ss").format(
                        "h:mm A"
                      )}
                    </th>
                    <th>{r.Status}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Skeleton />
        )}
        <div className="cardRightDiv">
          <VerticalCard />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AppointmentHistory;
