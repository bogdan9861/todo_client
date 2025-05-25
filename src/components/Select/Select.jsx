import React from "react";
import "./Select.scss";

const Select = ({ label, items }) => {
  return (
    <div className="select">
      <div className="select__head">
        <span className="select__head-label">{label}</span>
      </div>
      <div className="select__body">
        {items?.map((el) => (
          <div className="select__body-item" key={el.value}>
            {el.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
