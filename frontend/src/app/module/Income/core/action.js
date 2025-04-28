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
  setLoading,
} from "./slice";
import toast from "react-hot-toast";
import moment from "moment";

const useIncome = () => {
  const income = useSelector((state) => state.income);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch all income records
  const fetchIncome = async () => {
    dispatch(setLoading(true));

    try {
      const res = await reqGetIncome();

      dispatch(setIncome(res.data));
    } catch (e) {
      console.log("Error fetching income...", e);

      toast.error("Error fetching income");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle form input changes for adding income
  const onChangeAdd = (e) =>
    dispatch(setIncomeInfo({ name: e.target.name, value: e.target.value }));

  // Reset the form for adding income
  const onResetAdd = () => dispatch(resetIncomeInfo());

  // Create a new income record
  const onCreateIncome = async () => {
    const { date } = income.incomeInfo;
    const formattedDate = moment(date).toISOString();

    const data = { ...income.incomeInfo, date: formattedDate };

    dispatch(setLoading(true));

    try {
      await reqCreateIncome(data);
      toast.success("Income added...");

      onResetAdd();
      fetchIncome();

      return true;
    } catch (e) {
      console.log("Error:", e);

      const message =
        e?.response?.data?.message || e.message || "Error adding income";

      toast.error(message);

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Delete income record by ID
  const onDeleteIncome = async (id) => {
    dispatch(setLoading(true));

    try {
      await reqDeleteIncome(id);

      toast.success("Income has been deleted...");

      fetchIncome();
    } catch (e) {
      console.log("Error:", e);

      toast.error("Error deleting income...");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetch a specific income record by ID
  const fetchIncomeById = (payload) => dispatch(setIncomeDetails(payload));

  // Handle form input changes for editing income
  const onChangeEdit = (e) => {
    const { name, value } = e.target;

    dispatch(setIncomeDetailsInfo({ name, value }));
  };

  // Update an income record
  const onUpdateIncome = async () => {
    const data = income.incomeDetails;

    dispatch(setLoading(true));

    try {
      await reqUpdateIncome(data._id, data);

      toast.success(`${data?.category} has been updated...`);

      fetchIncome();
    } catch (e) {
      console.log("Error:", e);

      toast.error("Error updating income");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...income,
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
