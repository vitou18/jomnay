import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reqGetDashboard } from "./request";
import { setDashboard, setLoading } from "./slice";

const useDashboard = () => {
  const dashboard = useSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchDashboard = async () => {
    dispatch(setLoading(true));
    try {
      const res = await reqGetDashboard();

      // console.log(res);
      dispatch(setDashboard(res.data));
    } catch {
      console.log("Error get dashboard");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...dashboard,
    navigate,
    fetchDashboard,
  };
};

export default useDashboard;
