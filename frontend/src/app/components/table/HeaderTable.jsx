import React from "react";
import { RiAddLine } from "react-icons/ri";
import Button from "../../utils/Button";

const HeaderTable = ({ onClick, title = "Recent List" }) => {
  return (
    <header className="flex items-center justify-between">
      <h3 className="text-lg md:text-xl font-medium text-slate-900">{title}</h3>

      {onClick && (
        <div className="flex items-center gap-x-2.5">
          <Button text="Add" onClick={onClick} icon={RiAddLine} />
        </div>
      )}
    </header>
  );
};

export default HeaderTable;
