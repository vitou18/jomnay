import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reqLogin, reqRegister } from "./request";
import {
  resetRegister,
  setAccessToken,
  setLogin,
  setLogout,
  setProfile,
  setRegister,
} from "./slice";
import toast from "react-hot-toast";
import { useState } from "react";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onLogin = async (payload) => {
    setLoading(true);
    return reqLogin(payload)
      .then((res) => {
        dispatch(setProfile(res.data.user));
        dispatch(setAccessToken(res.data.token));
        navigate("/");
      })
      .catch((e) => {
        toast.error("Invalid credentials");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onChangeLogin = (e) =>
    dispatch(setLogin({ name: e.target.name, value: e.target.value }));

  const onLogout = () => {
    dispatch(setProfile({}));
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    dispatch(setLogout());
    navigate("/login");
  };

  const onChangeRegister = (e) =>
    dispatch(setRegister({ name: e.target.name, value: e.target.value }));

  const onRegister = async () => {
    setLoading(true);

    const { cpassword, ...registerData } = auth.register;

    return reqRegister(registerData)
      .then(() => {
        toast.success("Registration successful");
        dispatch(resetRegister());
      })
      .catch(() => {
        toast.error("Registration failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    ...auth,
    navigate,
    loading,
    onLogin,
    onChangeLogin,
    onLogout,
    onChangeRegister,
    onRegister,
  };
};

export default useAuth;
