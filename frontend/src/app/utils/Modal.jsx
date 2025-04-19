import React from "react";
import { RiCloseLargeFill } from "react-icons/ri";

const Modal = ({ children, show, setShow, title, desc, onDelete }) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={() => setShow((prev) => !prev)}
      className={`${
        show ? "scale-100" : "scale-0"
      } fixed top-0 left-0 flex w-full h-full items-center justify-center bg-slate-900/10 shadow-[0_0_8px_0_rgba(0,0,0,0.05)] backdrop-blur-sm z-50`}
    >
      <div
        onClick={handleModalClick}
        className={`${
          show ? "scale-100" : "scale-50"
        } transition-all duration-300 rounded-lg bg-white w-full mx-10 sm:mx-0 sm:w-[468px] relative p-5 shadow-[0_6px_6px_0_rgba(0,0,0,0.07)]`}
      >
        <div
          onClick={() => setShow((prev) => !prev)}
          className="absolute text-lg cursor-pointer top-4 right-4"
        >
          <RiCloseLargeFill />
        </div>

        <h3 className="text-xl font-medium text-slate-900">{title}</h3>
        <p className="text-gray-500 text-sm sm:text-base pb-2.5 border-b-2 border-slate-900/5">
          {desc}
        </p>

        {children}
      </div>
    </div>
  );
};

export default Modal;
