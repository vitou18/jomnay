import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reqLogin, reqRegister } from "./request";
import {
  resetRegister,
  setAccessToken,
  setLoading,
  setLogin,
  setLogout,
  setProfile,
  setRegister,
} from "./slice";
import toast from "react-hot-toast";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async (payload) => {
    dispatch(setLoading(true));
    return reqLogin(payload)
      .then((res) => {
        dispatch(setProfile(res.data.user));
        dispatch(setAccessToken(res.data.token));
        navigate("/");
      })
      .catch(() => {
        toast.error("Invalid credentials");
      })
      .finally(() => {
        dispatch(setLoading(false));
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
    dispatch(setLoading(true));

    const { cpassword, ...registerData } = auth.register;

    try {
      const res = await reqRegister(registerData);

      dispatch(setProfile(res.data.user));
      dispatch(setAccessToken(res.data.token));

      toast.success("Registration successful");
      dispatch(resetRegister());
      navigate("/");
    } catch {
      toast.error("Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...auth,
    navigate,
    onLogin,
    onChangeLogin,
    onLogout,
    onChangeRegister,
    onRegister,
  };
};

export default useAuth;
