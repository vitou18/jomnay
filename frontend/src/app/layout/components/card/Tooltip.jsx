import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const Tooltip = ({ type, amount }) => {
  return (
    <div
      className={`flex gap-x-1.5 text-sm md:font-medium items-center rounded-md p-2.5 ${
        type === "income"
          ? "bg-[#16A34A]/5 text-[#16A34A]"
          : "bg-[#DC2626]/5 text-[#DC2626]"
      }`}
    >
      <span>
        {type === "income" ? "+" : "-"}
        {amount}$
      </span>
      <span
        className={`${
          type === "income" ? "-rotate-6" : "rotate-6"
        } text-sm md:text-lg`}
      >
        {type === "income" ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
      </span>
    </div>
  );
};

export default Tooltip;
