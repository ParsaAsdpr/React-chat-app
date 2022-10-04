import React from "react";

const TextInput = ({ name, onChange, value, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        name={name}
        onChange={onChange}
        value={value}
        className="w-full bg-white bg-opacity-20 py-4 px-7 rounded-sm font-normal text-white"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
