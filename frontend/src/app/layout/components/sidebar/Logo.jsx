import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ logo }) => {
  return (
    <Link to="/" className="hidden md:block md:mb-10">
      <img src={logo} alt="logo" className="w-40 h-auto" />
    </Link>
  );
};

export default Logo;
