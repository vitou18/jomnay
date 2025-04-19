import React from "react";
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import useAuth from "../core/action";
import toast from "react-hot-toast";
import Logo from "../../../../_template/assets/img/big_logo.png";
import { RiMailLine, RiUserLine } from "react-icons/ri";

const Register = () => {
  const { onChangeRegister, register, onRegister, navigate, loading } =
    useAuth();
  let { fullName, email, password, cpassword } = register;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !cpassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== cpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    onRegister();
  };

  return (
    <div className="w-full flex min-h-screen font-popins">
      <div className="hidden md:flex items-center justify-center flex-1 bg-white">
        <img src={Logo} className="w-32 lg:w-48" alt="Jomnay Logo" />
      </div>

      <div className="bg-purple-600/4 flex-1/3 flex items-center justify-center px-5">
        <div className="w-full sm:w-[380px] py-10 px-5">
          <h3 className="text-center underline decoration-slate-900 decoration-2 underline-offset-4 mb-7 lg:mb-10 font-semibold text-3xl lg:text-4xl text-slate-900">
            Register Account
          </h3>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Enter your full name"
              name="fullName"
              onChange={onChangeRegister}
              type="text"
              label="Full Name"
              icon={RiUserLine}
              value={fullName}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              name="email"
              type="email"
              icon={RiMailLine}
              value={email}
              onChange={onChangeRegister}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              icon
              value={password}
              onChange={onChangeRegister}
            />

            <Input
              label="Confirm Password"
              placeholder="Enter your confirm password"
              name="cpassword"
              type="password"
              icon
              value={cpassword}
              onChange={onChangeRegister}
            />

            <Button
              text={loading ? "Registering..." : "Register"}
              type="submit"
              disabled={loading}
            />
          </form>

          <p className="text-center text-sm mt-5 lg:mt-7 text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-600 font-medium cursor-pointer underline decoration-purple-600"
            >
              Signin
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
