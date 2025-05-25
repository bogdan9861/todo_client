import React, { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../../service/projects";

import "./Aside.scss";
import { useCurrentQuery } from "../../service/auth";

import CreateProjectModal from "../CreateProjectModal/CreateProjectModal";
import Project from "../Project/Project";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const { data: projects, isLoading, error, refetch } = useGetProjectsQuery();
  const { data: user } = useCurrentQuery();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onLeave = () => {
    localStorage.removeItem("todo-token");
    navigate("/login");
  };

  return (
    <>
      <div className="aside">
        <div className="aside__profile">
          <div style={{ display: "flex", alignItems: "center", gap: "0 15px" }}>
            <div className="aside__profile-avatar">
              <span>{user?.data.name[0]}</span>
            </div>
            <div className="aside__profile-content">
              <span className="aside__profile-name">{user?.data.name}</span>
              <span className="aside__profile-login">@{user?.data.login}</span>
            </div>
          </div>
          <button className="aside__profile-leave" onClick={onLeave}>
            <img
              src="https://img.icons8.com/?size=100&id=EDekcWOuxMSj&format=png&color=9D1111"
              alt=""
            />
          </button>
        </div>
        <div
          className="aside__title-wrapper"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="aside__title">Проекты</span>
          <img
            width={13}
            src="https://img.icons8.com/?size=100&id=1501&format=png&color=acb1c2"
            alt=""
          />
        </div>
        <div className="aside__inner">
          <div className="aside__projects">
            {projects?.map((project) => (
              <Project
                project={project}
                refetch={refetch}
                setIsModalOpen={setIsModalOpen}
                setProject={setProject}
              />
            ))}
          </div>
        </div>
      </div>
      <CreateProjectModal
        project={project}
        setProject={setProject}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        refetch={refetch}
      />
    </>
  );
};

export default Aside;
