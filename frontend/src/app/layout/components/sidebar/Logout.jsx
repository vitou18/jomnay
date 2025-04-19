import React from "react";
import { FiLogOut } from "react-icons/fi";

const Logout = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer hidden md:flex md:mt-auto hover:bg-rose-600 w-12 h-12 rounded-full md:rounded-none text-white hover:text-white items-center justify-center md:justify-start gap-3 md:hover:text-white md:hover:bg-transparent md:px-4 md:py-3 md:w-full transition md:border-r-2 md:border-transparent md:hover:border-white"
    >
      <FiLogOut className="text-[20px] md:text-[24px]" />
      <span className="hidden md:inline">Logout</span>
    </button>
  );
};

export default Logout;
