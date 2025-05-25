import React from "react";
import "./Logo.scss";

const Logo = () => {
  return (
    <div className="logo">
      <img
        className="logo__img"
        src="https://img.icons8.com/?size=100&id=w0JUG294E8rU&format=png&color=000000"
        alt=""
      />
      <span className="logo__text">
        <span>To</span>
        Do
      </span>
    </div>
  );
};

export default Logo;
