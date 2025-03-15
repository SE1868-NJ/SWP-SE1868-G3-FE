import React from "react";

const Checkbox = ({ checked, onChange, ...props }) => {
  const checkboxStyle = {
    width: "16px",
    height: "16px",
    border: "2px solid gray",
    cursor: "pointer",
    backgroundColor: checked ? "gray" : "white",
    accentColor: "gray",
    boxShadow: "none",
    WebkitBoxShadow: "none",
  };

  return (
    <input
      type="checkbox"
      className="form-check-input"
      checked={checked}
      onChange={onChange}
      style={checkboxStyle}
      {...props}
    />
  );
};

export default Checkbox;