import React from "react";

const Button = ({ text, type, style, icon: Icon, onClick }) => {
  if (style === "logout") {
    return (
      <button
        onClick={onClick}
        className="w-[35px] h-[35px] md:hidden cursor-pointer flex items-center justify-center bg-rose-600/4 rounded-md text-rose-600 hover:text-white transition-all duration-300 hover:bg-rose-600"
      >
        <span className="text-lg">
          <Icon />
        </span>
      </button>
    );
  }

  if (Icon && text === "Add") {
    return (
      <button
        onClick={onClick}
        className="p-2 px-3 md:p-2.5 md:px-3.5 cursor-pointer flex items-center gap-x-2 bg-purple-600/4 rounded-md text-purple-600 hover:text-white transition-all duration-300 hover:bg-purple-600"
      >
        <span className="text-lg">
          <Icon />
        </span>
        <span>{text}</span>
      </button>
    );
  }

  if (Icon && text === "Download") {
    return (
      <button
        onClick={onClick}
        className="p-2.5 md:p-2.5 md:px-3.5 cursor-pointer flex items-center gap-x-2 bg-purple-600/4 rounded-md text-purple-600 hover:text-white transition-all duration-300 hover:bg-purple-600"
      >
        <span className="text-lg">
          <Icon />
        </span>
        <span className="hidden md:inline">{text}</span>
      </button>
    );
  }

  if (Icon && type === "delete") {
    return (
      <button
        onClick={onClick}
        className="p-2.5 cursor-pointer flex items-center justify-center text-slate-900 transition-all duration-300 hover:text-rose-600"
      >
        <span className="text-lg">
          <Icon />
        </span>
      </button>
    );
  }

  if (Icon && type === "edit") {
    return (
      <button
        onClick={onClick}
        className="p-2.5 cursor-pointer flex items-center justify-center text-slate-900 transition-all duration-300 hover:text-green-600"
      >
        <span className="text-lg">
          <Icon />
        </span>
      </button>
    );
  }
  
  if (Icon && type === "view") {
    return (
      <button
        onClick={onClick}
        className="p-2.5 cursor-pointer flex items-center justify-center text-slate-900 transition-all duration-300 hover:text-purple-600"
      >
        <span className="text-lg">
          <Icon />
        </span>
      </button>
    );
  }

  if (style === "second") {
    return (
      <button
        onClick={onClick}
        className="transition duration-300 w-full hover:bg-purple-700 mt-5 lg:mt-7 bg-purple-600 rounded-md text-white p-2.5 cursor-pointer text-lg font-medium"
        type={type}
      >
        {text}
      </button>
    );
  }

  if (style === "gray") {
    return (
      <button
        onClick={onClick}
        className="transition duration-300 w-full hover:bg-gray-600 hover:text-white rounded-md bg-gray-100 text-slate-900 p-2.5 cursor-pointer font-medium"
        type={type}
      >
        {text}
      </button>
    );
  }

  if (style === "first") {
    return (
      <button
        onClick={onClick}
        className="transition duration-300 w-full hover:bg-purple-700 rounded-md bg-purple-600 text-white p-2.5 cursor-pointer font-medium"
        type={type}
      >
        {text}
      </button>
    );
  }

  if (style === "delete") {
    return (
      <button
        onClick={onClick}
        className="transition duration-300 w-full hover:bg-rose-700 rounded-md bg-rose-600 text-white p-2.5 cursor-pointer font-medium"
        type={type}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      className="transition duration-300 w-full hover:bg-purple-700 bg-purple-600 rounded-md text-white p-2.5 cursor-pointer font-medium"
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
