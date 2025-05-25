import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContrastTextColor } from "../../utils/getContrastTextColor";
import { setIsMenuOpen, setselectedTask } from "../../features/projectSlice";
import CheckBtn from "../CheckBtn/CheckBtn";

import "./Item.scss";

const Item = ({ project, task }) => {
  const { selectedTask, isMenuOpen } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  console.log(selectedTask);

  const contrastBgColor = useMemo(() => {
    return getContrastTextColor(project?.color || "", {
      bright: "#fff",
      dark: "rgba(0,0,0,0.8)",
    });
  });

  const contrastTextColor = useMemo(() => {
    return getContrastTextColor(contrastBgColor || "", {
      bright: "#fff",
      dark: "rgba(0,0,0,0.8)",
    });
  });

  const onItemClick = () => {
    dispatch(setIsMenuOpen(true));
    dispatch(setselectedTask(task));
  };

  console.log(task);

  return (
    <>
      <div className="item__wrapper" style={{ position: "relative" }}>
        <CheckBtn
          contrastTextColor={contrastTextColor}
          task={task}
          props={{
            style: {
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              zIndex: 10,
              opacity: task?.id === selectedTask?.id && isMenuOpen ? 0 : 1,
              transition: "all 0.3s",
            },
          }}
        />
        <li
          onClick={onItemClick}
          className={`item ${
            task?.id === selectedTask?.id && isMenuOpen ? "item--selected" : ""
          } slide`}
          style={{
            backgroundColor: contrastBgColor,
            color: contrastTextColor,
            borderTop: `8px solid ${getContrastTextColor(project?.color || "", {
              bright: "rgb(191 187 255)",
              dark: "rgb(73 73 73 / 80%)",
            })}`,
          }}
        >
          <div className="item__content">
            <span className="item__name">{task?.text}</span>
            <span className="item__status">{task?.status?.name}</span>
          </div>
        </li>
      </div>
    </>
  );
};

export default Item;
