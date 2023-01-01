import React from "react";

const Button = (props) => {
  return (
    <button
      className="bg-[#5048E5] hover:bg-[#3832A0]"
      style={{ color: "white", padding: "8px 100px", borderRadius: 8 }}
    {...props}
    >
      {props.children}
      
    </button>
  );
};

export default Button;
