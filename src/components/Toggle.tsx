import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, onClick }) => {
  return (
    <div
      onClick={(e) => {
        onClick(e);
        onChange(!checked);
      }}
      style={{
        width: "40px",
        height: "25px",
        borderRadius: "25px",
        borderWidth: "2px",
        backgroundColor: checked ? "#FFDF2B" : "#CDCDCB",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, justify-content 1s ease",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          borderWidth: "2px",
          backgroundColor: checked ? "#FFDF2B" : "#898989",
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: "3px",
          left: checked ? "calc(100% - 20px)" : "5px",
          transition: "left 0.3s ease",
        }}
      ></div>
    </div>
  );
};

export default Toggle;
