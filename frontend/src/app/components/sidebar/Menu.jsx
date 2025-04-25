import React from "react";
import { NavLink } from "react-router-dom";

const Menu = ({ sidebarItems }) => {
  return (
    <ul className="flex md:flex-col gap-x-[10px] md:gap-y-[20px] md:justify-between">
      {sidebarItems.map((item) => (
        <li key={item.name}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center w-10 h-10 rounded-full md:rounded-none md:w-full md:h-max justify-center md:justify-start md:gap-4 md:px-4 md:py-3 md:border-r-4 transition ${
                isActive
                  ? "md:border-r-purple-600 text-[#FFF] md:bg-transparent bg-purple-600 md:text-purple-600"
                  : "md:border-transparent hover:bg-[#FFF] md:hover:bg-transparent md:hover:text-white hover:text-slate-900 md:hover:border-white text-white"
              }`
            }
          >
            <span className="text-lg md:text-xl">{item.icon}</span>
            <span className="hidden md:inline">{item.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
