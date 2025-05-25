import { Button, ColorPicker, Modal } from "antd";
import Dragger from "antd/es/upload/Dragger";

import "./CreateProjectModal.scss";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../service/projects";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CreateProjectModal = ({
  project,
  setProject,
  open,
  setOpen,
  refetch,
}) => {
  const [createProject] = useCreateProjectMutation();
  const [editProject] = useUpdateProjectMutation();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(project);

    setName(project?.name);
    setColor(project?.color);
  }, [project]);

  const clearState = () => {
    setFileList([]);
    setFile(null);
    setColor("");
    setName("");
  };

  const onCreate = async () => {
    const data = new FormData();

    data.append("name", name);

    if (color) {
      data.append("color", color);
    }

    if (file) {
      data.append("image", file);
    }

    try {
      if (project) {
        data.append("id", project.id);
        await editProject(data).unwrap();
      } else {
        await createProject(data).unwrap();
      }
      clearState();
      setOpen(false);
      refetch();
      setProject(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      title="Новый проект"
    >
      <div className="create">
        <div className="create__item">
          <h3 className="create__item-title">Название</h3>
          <input
            className="create__item-input"
            placeholder="Введите название проекта"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="create__item">
          <h3 className="create__item-title">Цвет проекта</h3>
          <span className="create__item-text">
            С каким цветом ассоциируется этоти проект? <br /> (не обязательно)
          </span>
          <ColorPicker
            size="middle"
            allowClear
            value={color}
            onChangeComplete={(color) => setColor(`#${color.toHex()}`)}
          />
        </div>

        <div className="create__item">
          <h3 className="create__item-title">Иконка / Лого</h3>
          <span className="create__item-text">
            Выберите картинку для проекта (не обязательно)
          </span>
          <Dragger
            onChange={(file) => {
              setFile(file.file.originFileObj);
              setFileList(file.fileList);
            }}
            fileList={fileList}
          />
        </div>
        <Button type="primary" onClick={onCreate}>
          Создать
        </Button>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
