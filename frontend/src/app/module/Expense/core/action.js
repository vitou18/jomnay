import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  reqCreateExpense,
  reqDeleteExpense,
  reqGetExpense,
  reqUpdateExpense,
} from "./request";
import {
  resetExpenseInfo,
  setExpense,
  setExpenseDetails,
  setExpenseDetailsInfo,
  setExpenseInfo,
} from "./slice";
import { useState } from "react";
import toast from "react-hot-toast";
import moment from "moment/moment";

const useExpense = () => {
  const expense = useSelector((state) => state.expense);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchExpense = async () => {
    return reqGetExpense()
      .then((res) => {
        // console.log(res)
        dispatch(setExpense(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeAdd = (e) =>
    dispatch(setExpenseInfo({ name: e.target.name, value: e.target.value }));

  const onResetAdd = () => dispatch(resetExpenseInfo());

  const onCreateExpense = async () => {
    const { date } = expense.expenseInfo;

    const formattedDate = moment(date).toISOString();

    const data = {
      ...expense.expenseInfo,
      date: formattedDate,
    };

    setLoading(true);

    try {
      await reqCreateExpense(data);

      toast.success("Expense added...");

      onResetAdd();
      fetchExpense();

      return true;
    } catch (e) {
      console.log(e);

      const message =
        e?.response?.data?.message || e.message || "Error adding income";

      toast.error(message);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const onDeleteExpense = async (id) => {
    return reqDeleteExpense(id)
      .then(() => {
        toast.success("Expense has been deleted...");
        fetchExpense();
      })
      .catch(() => {
        toast.error("Error deleting income...");
      });
  };

  const fetchExpenseById = (payload) => dispatch(setExpenseDetails(payload));

  const onChangeEdit = (e) =>
    dispatch(
      setExpenseDetailsInfo({ name: e.target.name, value: e.target.value })
    );

  const onUpdateExpense = async () => {
    const data = expense.expenseDetails;

    setLoading(true);

    try {
      await reqUpdateExpense(data._id, data);
      toast.success(`${data?.category} has been updated...`);
      fetchExpense();
    } catch {
      toast.error("Error updating expense");
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchExpense,
    ...expense,
    navigate,
    onChangeAdd,
    onResetAdd,
    onCreateExpense,
    loading,
    onDeleteExpense,
    fetchExpenseById,
    onChangeEdit,
    onUpdateExpense,
  };
};

export default useExpense;
