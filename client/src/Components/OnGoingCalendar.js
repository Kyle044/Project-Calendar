import React, { useEffect, useState } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import TaskViewer from "./TaskViewer/TaskViewer";
import "../Css/calendar.css";
const OnGoingCalendar = React.forwardRef(({ goal, appointment }, ref) => {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  var events = [];
  const [toggle, setToggle] = useState({
    taskModalVisible: false
  });
  const [selectedGoal, setSelectedGoal] = useState();
  function taskhandleOk(params) {
    setSelectedGoal(null);
    setToggle({ taskModalVisible: false });
  }
  function taskhandleCancel(params) {
    setSelectedGoal(null);
    setToggle({ taskModalVisible: false });
  }

  function handleEventClick(params) {
    let sGoal = goal.find((g) => g._id == params.event._def.publicId);

    setSelectedGoal(sGoal);
    setToggle((prev) => {
      return { taskModalVisible: true };
    });
  }
  if (goal) {
    var goalArray = goal.map((g) => {
      return {
        id: g._id,
        title: g.Subject,
        start: g.StartDate.substr(0, 10),
        end: g.DueDate.substr(0, 10),
        color: "#ff5c58"
      };
    });
    var appointmentArray = appointment.map((a) => {
      return {
        id: a._id,
        title: a.Status,
        start: a.Date.substr(0, 10),
        end: a.Date.substr(0, 10),
        color: "#0D0D0D"
      };
    });
    events = [...goalArray, ...appointmentArray];
  }
  return (
    <div ref={ref}>
      {goal ? (
        <FullCalendar
          className="cal"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={(arg) => {
            console.log(arg);
          }}
          eventClick={(ok) => {
            handleEventClick(ok);
          }}
          height={"90vh"}
        />
      ) : null}
      {selectedGoal && (
        <TaskViewer
          goal={selectedGoal}
          taskModalVisible={toggle.taskModalVisible}
          taskhandleOk={taskhandleOk}
          taskhandleCancel={taskhandleCancel}
        />
      )}
    </div>
  );
});

export default OnGoingCalendar;
