import React, { useDebugValue } from "react";

import "./CheckBtn.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../features/projectSlice";
import { useDelteTaskMutation } from "../../service/tasks";

const CheckBtn = ({ contrastTextColor, props, task }) => {
  const [delteTaskMutation] = useDelteTaskMutation();
  const selectedTask = useSelector((state) => state.project.selectedTask);

  const onDeleteTask = async () => {
    try {
      await delteTaskMutation(task?.id || selectedTask?.id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const onCheck = () => {
    onDeleteTask();
  };

  return (
    <button
      {...props}
      onClick={onCheck}
      className={`checkBtn ${props?.className || ""}`}
      style={{ borderColor: contrastTextColor, ...props.style }}
    >
      <div
        className={`checkBtn__check ${
          selectedTask?.id === task?.id && selectedTask?.checked
            ? "checkBtn__check--active"
            : ""
        }`}
        style={{ backgroundColor: contrastTextColor }}
      ></div>
    </button>
  );
};

export default CheckBtn;
