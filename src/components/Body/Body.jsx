import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { getData } from "../../utils/getData";
import { getContrastTextColor } from "../../utils/getContrastTextColor";

import NoProject from "../NoProject/NoProject";
import Input from "../Input/Input";
import List from "../List/List";

import "./Body.scss";

const Body = () => {
  const project = useSelector((state) => state.project.project);

  return (
    <main
      className="body"
      style={{
        backgroundColor: project?.color,
        color: getContrastTextColor(project?.color || ""),
      }}
    >
      {project ? (
        <div className="body__inner">
          <div className="body__content fall">
            <span className="body__project-name">{project?.name}</span>
            <span className="body__project-date">{getData()}</span>
          </div>
          <List project={project} />
          <Input project={project} placeholder="Добавить задачу" />
        </div>
      ) : (
        <NoProject />
      )}
    </main>
  );
};

export default Body;
