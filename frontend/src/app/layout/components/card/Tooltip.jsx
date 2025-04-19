import React from "react";
import { RiArrowLeftDownLine, RiArrowRightUpLine } from "react-icons/ri";

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
        $
        {amount}
      </span>
      <span className="text-sm md:text-lg">
        {type === "income" ? <RiArrowRightUpLine /> : <RiArrowLeftDownLine />}
      </span>
    </div>
  );
};

export default Tooltip;
