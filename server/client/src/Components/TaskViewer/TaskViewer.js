import React, { useState, useEffect } from "react";
import "./taskViewer.css";
import { Modal, Timeline } from "antd";
function TaskViewer({
  goal,
  taskModalVisible,
  taskhandleOk,
  taskhandleCancel
}) {
  const [sortedGoal, setSortedGoal] = useState();
  useEffect(() => {
    console.log(goal);
  }, []);
  return (
    <div>
      <Modal
        title="Tasks Timeline"
        visible={true}
        onOk={taskhandleOk}
        onCancel={taskhandleCancel}
      >
        {goal && (
          <Timeline>
            {goal.Tasks.map((t) => {
              return (
                <Timeline.Item>
                  {t.startDate.substr(0, 10)} : {t.Description}
                </Timeline.Item>
              );
            })}
          </Timeline>
        )}
      </Modal>
    </div>
  );
}

export default TaskViewer;
