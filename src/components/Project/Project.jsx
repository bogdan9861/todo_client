import React from "react";
import { Dropdown, Space } from "antd";
import {
  useDeleteProjectMutation,
  useGetProjectsByIdMutation,
} from "../../service/projects";
import { useDispatch, useSelector } from "react-redux";
import { getContrastTextColor } from "../../utils/getContrastTextColor";
import { setIsMenuOpen } from "../../features/projectSlice";
import { setFile } from "../../utils/setFile";

const Project = ({ project, refetch, setIsModalOpen, setProject }) => {
  const [getProject] = useGetProjectsByIdMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const currentProject = useSelector((state) => state.project.project);

  const dispatch = useDispatch();

  const onSelectProject = async (id) => {
    try {
      dispatch(setIsMenuOpen(false));
      await getProject(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteProject(project?.id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      key: "1",
      label: "Изменить",
      icon: (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 21H12"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      onClick: () => {
        setIsModalOpen(true);
        setProject(project);
      },
    },

    {
      key: "4",
      danger: true,
      icon: (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.73708 6.54391V18.9857C5.73708 19.7449 6.35257 20.3604 7.11182 20.3604H16.8893C17.6485 20.3604 18.264 19.7449 18.264 18.9857V6.54391M2.90906 6.54391H21.0909"
            stroke="#D21010"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <path
            d="M8 6V4.41421C8 3.63317 8.63317 3 9.41421 3H14.5858C15.3668 3 16 3.63317 16 4.41421V6"
            stroke="#D21010"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>
      ),
      label: "Удалить",
      onClick: onDelete,
    },
  ];

  return (
    <div
      className={`aside__projects-item ${
        currentProject?.id === project?.id ? "aside__item--active" : ""
      }`}
      onClick={() => onSelectProject(project.id)}
    >
      <div className="aside__projects-item__wrapper">
        {project?.avatar ? (
          <img
            className="aside__projects-avatar"
            src={setFile(project.avatar)}
            alt=""
          />
        ) : (
          <span
            className="aside__reduction"
            style={{
              backgroundColor: project?.color,
              color: getContrastTextColor(project?.color || "", {
                bright: "#fff",
                dark: "rgba(0,0,0,0.8)",
              }),
            }}
          >
            {project?.name[0]}
          </span>
        )}

        <span className="aside__text">{project?.name}</span>
      </div>

      {project?.tasks.length > 0 && (
        <div className="aside__counter">
          <span>{project?.tasks.length}</span>
        </div>
      )}

      <Dropdown className="aside__menu" menu={{ items }}>
        <Space>
          <svg
            style={{ width: 20 }}
            data-v-edb23ac6=""
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              opacity="0.39"
              d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
              fill="#6C78F4"
            ></path>
            <path
              d="M5 10C6.1 10 7 10.9 7 12C7 13.1 6.1 14 5 14C3.9 14 3 13.1 3 12C3 10.9 3.9 10 5 10ZM19 10C20.1 10 21 10.9 21 12C21 13.1 20.1 14 19 14C17.9 14 17 13.1 17 12C17 10.9 17.9 10 19 10Z"
              fill="#6C78F4"
            ></path>
          </svg>
        </Space>
      </Dropdown>
    </div>
  );
};

export default Project;
