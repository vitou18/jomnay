import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reqGetDashboard } from "./request";
import { setDashboard } from "./slice";

const useDashboard = () => {
  const dashboard = useSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchDashboard = async () => {
    return reqGetDashboard()
      .then((res) => {
        // console.log(res);
        dispatch(setDashboard(res.data));
      })
      .catch((e) => console.log(e));
  };

  return {
    ...dashboard,
    navigate,
    fetchDashboard,
  };
};

export default useDashboard;
