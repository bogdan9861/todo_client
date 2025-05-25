import React from "react";

import "./NoProject.scss";

const NoProject = () => {
  return (
    <div className="noProject">
      <img
        className="noProject__img"
        src="https://img.icons8.com/?size=100&id=114426&format=png&color=000000"
        alt=""
      />
      <span className="noProject__text">
        Добавьте новый проект или выберите из списка
      </span>
    </div>
  );
};

export default NoProject;
