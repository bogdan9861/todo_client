import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../../components/Aside/Aside";
import Body from "../../components/Body/Body";
import ItemMenu from "../../components/ItemMenu/ItemMenu";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("todo-token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Aside />
      <Body />
      <ItemMenu />
    </div>
  );
};

export default Main;
