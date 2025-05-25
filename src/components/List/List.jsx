import React, { useEffect, useRef } from "react";

import Item from "../Item/Item";
import "./List.scss";

const List = ({ project }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.clientHeight);
    }
  }, [project?.tasks?.length, listRef.current]);

  return (
    <ul className="list" ref={listRef}>
      {project?.tasks?.map((task) => (
        <Item project={project} task={task} />
      ))}
    </ul>
  );
};

export default List;
