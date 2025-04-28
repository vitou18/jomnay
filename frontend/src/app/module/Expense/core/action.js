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
  setLoading,
} from "./slice";
import toast from "react-hot-toast";
import moment from "moment";

const useExpense = () => {
  const expense = useSelector((state) => state.expense);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch all expenses
  const fetchExpense = async () => {
    dispatch(setLoading(true));

    try {
      const res = await reqGetExpense();

      dispatch(setExpense(res.data));
    } catch (e) {
      console.log(e);

      toast.error("Error fetching expenses");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle changes in the expense form (Add)
  const onChangeAdd = (e) =>
    dispatch(setExpenseInfo({ name: e.target.name, value: e.target.value }));

  // Reset the form fields (Add)
  const onResetAdd = () => dispatch(resetExpenseInfo());

  // Create a new expense
  const onCreateExpense = async () => {
    const { date } = expense.expenseInfo;
    const formattedDate = moment(date).toISOString();
    const data = { ...expense.expenseInfo, date: formattedDate };

    dispatch(setLoading(true));

    try {
      await reqCreateExpense(data);

      toast.success("Expense added...");

      onResetAdd();
      fetchExpense();
    } catch (e) {
      console.log(e);

      const message =
        e?.response?.data?.message || e.message || "Error adding expense";

      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Delete an expense by ID
  const onDeleteExpense = async (id) => {
    dispatch(setLoading(true));

    try {
      await reqDeleteExpense(id);

      toast.success("Expense has been deleted...");

      fetchExpense();
    } catch (e) {
      console.log(e);

      toast.error("Error deleting expense...");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetch expense details by ID
  const fetchExpenseById = (payload) => dispatch(setExpenseDetails(payload));

  // Handle changes in the expense details form (Edit)
  const onChangeEdit = (e) =>
    dispatch(
      setExpenseDetailsInfo({ name: e.target.name, value: e.target.value })
    );

  // Update an expense
  const onUpdateExpense = async () => {
    const data = expense.expenseDetails;

    dispatch(setLoading(true));

    try {
      await reqUpdateExpense(data._id, data);

      toast.success(`${data?.category} has been updated...`);

      fetchExpense();
    } catch (e) {
      console.log(e);
      toast.error("Error updating expense");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    fetchExpense,
    ...expense,
    navigate,
    onChangeAdd,
    onResetAdd,
    onCreateExpense,
    onDeleteExpense,
    fetchExpenseById,
    onChangeEdit,
    onUpdateExpense,
  };
};

export default useExpense;
