import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reqGetDashboard } from "./request";
import { setDashboard, setLoadData } from "./slice";

const useDashboard = () => {
  const dashboard = useSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchDashboard = async () => {
    dispatch(setLoadData(true));

    return reqGetDashboard()
      .then((res) => {
        // console.log(res);
        dispatch(setDashboard(res.data));
      })
      .catch((e) => console.log(e))
      .then(() => {
        dispatch(setLoadData(false));
      });
  };

  return {
    ...dashboard,
    navigate,
    fetchDashboard,
  };
};

export default useDashboard;
