import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateTasksMutation } from "../../service/tasks";
import "./Input.scss";
import { getContrastTextColor } from "../../utils/getContrastTextColor";

const Input = (props) => {
  const [createTask] = useCreateTasksMutation();
  const [text, setText] = useState("");

  const { project } = props;
  const dispatch = useDispatch();

  const contrastBgColor = useMemo(() => {
    return getContrastTextColor(project?.color || "", {
      bright: "rgba(255,255,255)",
      dark: "rgba(255,255,255)",
    });
  });

  const contrastTextColor = useMemo(() => {
    return getContrastTextColor(project?.color || "", {
      bright: "transparent",
      dark: "rgba(0,0,0,0.4)",
    });
  });

  const onCreate = async () => {
    if (!text) return;

    try {
      await createTask({ projectId: project.id, text }).unwrap;
    } catch (error) {
      console.log(error);
    }

    setText("");
  };

  return (
    <div className="input_wrapper">
      <div className="input_inner">
        <svg
          className="input_img"
          fill="#8c8c8c"
          width="800px"
          height="800px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onCreate}
        >
          <title>plus</title>
          <path d="M30 15.25h-13.25v-13.25c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 13.25h-13.25c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h13.25v13.25c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-13.25h13.25c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"></path>
        </svg>

        <input
          className="input"
          type="text"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onCreate()}
          value={text}
          style={{
            backgroundColor: contrastBgColor,
            border: `1px solid ${contrastTextColor}`,
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
