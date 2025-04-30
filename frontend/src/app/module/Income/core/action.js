import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  reqCreateIncome,
  reqDeleteIncome,
  reqGetIncome,
  reqUpdateIncome,
} from "./request";
import {
  resetIncomeInfo,
  setIncome,
  setIncomeDetails,
  setIncomeDetailsInfo,
  setIncomeInfo,
  setLoadData,
} from "./slice";
import toast from "react-hot-toast";
import moment from "moment";
import { useState } from "react";

const useIncome = () => {
  const income = useSelector((state) => state.income);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchIncome = async () => {
    dispatch(setLoadData(true));

    try {
      const res = await reqGetIncome();
      dispatch(setIncome(res.data));
    } catch (e) {
      console.log("Error fetching income...", e);
    } finally {
      dispatch(setLoadData(false));
    }
  };

  const onChangeAdd = (e) =>
    dispatch(setIncomeInfo({ name: e.target.name, value: e.target.value }));

  const onResetAdd = () => dispatch(resetIncomeInfo());

  const onCreateIncome = async () => {
    const { date } = income.incomeInfo;

    const formattedDate = moment(date).toISOString();

    const data = {
      ...income.incomeInfo,
      date: formattedDate,
    };

    setLoading(true);
    try {
      await reqCreateIncome(data);

      toast.success("Income added...");

      onResetAdd();
      fetchIncome();

      return true;
    } catch (e) {
      // console.log(e);

      const message =
        e?.response?.data?.message || e.message || "Error adding income";

      toast.error(message);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const onDeleteIncome = async (id) => {
    return reqDeleteIncome(id)
      .then(() => {
        toast.success("Income has been deleted...");
        fetchIncome();
      })
      .catch(() => {
        toast.error("Error deleting income...");
      });
  };

  const fetchIncomeById = (payload) => dispatch(setIncomeDetails(payload));

  const onChangeEdit = (e) => {
    const { name, value } = e.target;
    dispatch(setIncomeDetailsInfo({ name, value }));
  };

  const onUpdateIncome = async () => {
    const data = income.incomeDetails;

    setLoading(true);

    try {
      await reqUpdateIncome(data._id, data);
      toast.success(`${data?.category} has been updated...`);

      fetchIncome();
    } catch {
      toast.error("Error updating income");
    } finally {
      setLoading(false);
    }
  };

  return {
    ...income,
    loading,
    fetchIncome,
    navigate,
    onChangeAdd,
    onResetAdd,
    onCreateIncome,
    onDeleteIncome,
    fetchIncomeById,
    onChangeEdit,
    onUpdateIncome,
  };
};

export default useIncome;
