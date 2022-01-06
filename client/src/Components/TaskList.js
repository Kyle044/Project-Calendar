import React from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
function TaskList({ Task, Delete }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
      }}
    >
      <h4 style={{ marginRight: "10px", transform: "translateY(14%)" }}>
        {" "}
        {Task.Subject}
      </h4>
      <MinusCircleOutlined
        onClick={() => {
          Delete(Task);
        }}
      />
    </div>
  );
}

export default TaskList;
