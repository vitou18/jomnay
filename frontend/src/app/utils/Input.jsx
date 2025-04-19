import React, { useState } from "react";
import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";

const Input = ({
  name,
  icon: Icon,
  type,
  onChange = () => console.log("Click"),
  value,
  placeholder,
  label,
  disabled = false,
}) => {
  const [show, setShow] = useState(false);

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

      <div className="w-full relative">
        <input
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${Icon ? "pe-7" : ""} 
          px-3 py-2  duration-300 transition-all border-2 rounded-md outline-0 focus:border-slate-900 focus:placeholder:text-slate-900 text-sm ${
            disabled
              ? "bg-purple-600/4 cursor-not-allowed text-purple-900 border-purple-600 not-placeholder-shown:border-purple-500"
              : "border-gray-500 text-slate-900 not-placeholder-shown:border-slate-500"
          }`}
          type={show ? "text" : type}
          name={name}
          id={name}
          value={value}
          required
        />

        {Icon &&
          (type === "password" ? (
            <div
              onClick={() => setShow(!show)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
            >
              {show ? (
                <RiLockUnlockLine className="text-lg text-slate-900" />
              ) : (
                <RiLockLine className="text-lg text-gray-500" />
              )}
            </div>
          ) : (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <Icon className="text-lg text-gray-500" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Input;
