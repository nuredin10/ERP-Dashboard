import React from "react";

const Button = (props) => {
  return (
    <button
      className="w-40 bg-[#61482A]  text-white font-bold text-sm hover:shadow-lg hover:bg-[#EBE5D8] hover:text-[#61482A]"
      style={{  padding: "8px 20px", borderRadius: 8 }}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
