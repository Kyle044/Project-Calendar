import React from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
function TaskList({ Task, Delete }) {
  return (
    <div>
      <h1> {Task.Subject}</h1>
      <MinusCircleOutlined
        onClick={() => {
          Delete(Task);
        }}
      />
    </div>
  );
}

export default TaskList;
