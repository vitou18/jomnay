import React from "react";

const Textarea = ({
  name,
  onChange = () => console.log("Click"),
  value,
  placeholder,
  label,
  rows = 4,
  disabled = false,
}) => {
  return (
    <div className="grid">
      <label
        htmlFor={name}
        className={`${
          disabled ? "text-purple-900" : "text-slate-900"
        } font-medium`}
      >
        <span className="capitalize">{label}</span>
      </label>

      <textarea
        required
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 focus:border-slate-900 focus:placeholder:text-slate-900 duration-300 transition-all border-2 rounded-md outline-0 text-sm resize-none ${
          disabled
            ? "bg-purple-600/4 cursor-not-allowed border-purple-600 text-purple-900 not-placeholder-shown:border-purple-500"
            : "border-gray-500 not-placeholder-shown:border-slate-500 text-slate-900 "
        }`}
      ></textarea>
    </div>
  );
};

export default Textarea;
