import React from "react";

const Button = (props) => {
  return (
    <button
      className={` ${props.disabled ? 'bg-[#EBE5D8]' : 'bg-[#61482A] hover:bg-[#EBE5D8] hover:text-[#61482A] hover:shadow-lg'} w-40  text-white font-bold text-sm  `}
      style={{  padding: "8px 20px", borderRadius: 8 }}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
