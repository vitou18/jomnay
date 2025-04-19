import toast from "react-hot-toast";
import Button from "../../../utils/Button";
import Input from "../../../utils/Input";
import useAuth from "../core/action";
import Logo from "../../../../_template/assets/img/big_logo.png";
import { RiMailLine } from "react-icons/ri";

const Login = () => {
  const { onLogin, onChangeLogin, login, navigate, loading } = useAuth();
  let { email, password } = login;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    onLogin(login);
  };

  return (
    <div className="w-full flex min-h-screen font-popins">
      <div className="hidden md:flex items-center justify-center flex-1 bg-purple-600/4">
        <img src={Logo} className="w-32 lg:w-48" alt="Jomnay Logo" />
      </div>

      <div className="bg-white flex-1/3 flex items-center justify-center px-5">
        <div className="w-full sm:w-[380px] py-10 px-5">
          <h3 className="text-center tracking-widest underline decoration-slate-900 decoration-2 underline-offset-4 mb-7 lg:mb-10 font-semibold text-4xl text-slate-900">
            Login Account.
          </h3>
          <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
            <Input
              placeholder="Enter your email"
              name="email"
              value={email}
              type="email"
              icon={RiMailLine}
              onChange={onChangeLogin}
              label="Email"
            />

            <Input
              placeholder="Enter your password"
              name="password"
              type="password"
              icon
              label="Password"
              value={password}
              onChange={onChangeLogin}
            />

            <Button
              type="submit"
              text={loading ? "Logging in..." : "Login"}
              disabled={loading}
            />
          </form>

          <p className="text-center text-sm mt-2.5 lg:mt-5 text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-600 font-medium cursor-pointer underline decoration-purple-600"
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
