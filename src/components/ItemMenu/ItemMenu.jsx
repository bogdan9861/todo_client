import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsMenuOpen } from "../../features/projectSlice";
import CheckBtn from "../CheckBtn/CheckBtn";

import "./ItemMenu.scss";
import { MenuItem, Select } from "@mui/material";
import { useGetStatusesQuery } from "../../service/status";
import { useUpdateTasksMutation } from "../../service/tasks";

const ItemMenu = () => {
  const dispatch = useDispatch();

  const project = useSelector((state) => state.project);
  const currentTusk = useSelector((state) => state.project.selectedTask);

  const { data: statuses, isLoading } = useGetStatusesQuery();
  const [updateTask] = useUpdateTasksMutation();

  const [status, setStatus] = useState(null);
  const [taskName, setTaskName] = useState("");

  const updateData = async (data) => {
    try {
      await updateTask(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const updateName = async () => {
    if (!taskName) return;

    await updateData({ id: currentTusk?.id, text: taskName });
  };

  const updateStatus = async (data) => {
    try {
      await updateTask(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTaskName(project?.selectedTask?.text);
  }, [project?.selectedTask?.text]);

  useEffect(() => {
    const statusId = project?.selectedTask?.status?.id;

    if (statusId) {
      setStatus(statusId);
    }
  }, [project?.selectedTask?.status?.id]);

  useEffect(() => {
    if (status) {
      updateStatus({ id: currentTusk?.id, statusId: status });
    }
  }, [status]);

  const onClose = () => {
    dispatch(setIsMenuOpen(false));
  };

  return (
    <div
      className="menu"
      style={{
        width: project?.isMenuOpen ? 500 : 0,
        display: project?.isMenuOpen ? "block" : "none",
      }}
    >
      <button className="menu__close" onClick={onClose}>
        <svg
          style={{ transform: "rotate(45deg)" }}
          fill="#636363"
          width="20px"
          height="20px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>plus</title>
          <path d="M30 15.25h-13.25v-13.25c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 13.25h-13.25c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h13.25v13.25c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-13.25h13.25c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"></path>
        </svg>
      </button>
      <div className="menu__inner">
        <div className="menu__info">
          <div className="menu__info-chechk__wrapper">
            <input
              className="menu__info-name"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onBlur={() => updateName()}
              onKeyDown={(e) => e.key === "Enter" && updateName()}
            />
          </div>
          <span className="menu__info-status">
            {project?.selectedTask?.status?.name}
          </span>
          <CheckBtn
            contrastTextColor={"rgba(0,0,0,0.6)"}
            props={{ className: "menu__check" }}
          />
        </div>
        <div className="menu__item">
          <span className="menu__item-title">Изменить статус</span>
          <Select
            style={{ width: "100%" }}
            label="Статус"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statuses?.map((status) => (
              <MenuItem value={status?.id}>{status?.name}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ItemMenu;
