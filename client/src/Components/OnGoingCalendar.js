import React, { useEffect, useState } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
function OnGoingCalendar({ goal }) {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  var events = [];
  if (goal) {
    events = goal.map((g) => {
      return {
        title: g.Subject,
        start: g.StartDate,
        end: g.DueDate
      };
    });
  }
  return (
    <div>
      {goal ? (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
      ) : null}
    </div>
  );
}

export default OnGoingCalendar;
