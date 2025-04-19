import { combineReducers } from "redux";
import authSlice from "../module/Auth/core/slice";
import dashboardSlice from "../module/Dashboard/core/slice";
import incomeSlice from "../module/Income/core/slice";
import expenseSlice from "../module/Expense/core/slice";
import reportSlice from "../module/Report/core/slice";

const rootReducer = combineReducers({
  auth: authSlice,
  dashboard: dashboardSlice,
  income: incomeSlice,
  income: incomeSlice,
  expense: expenseSlice,
  report: reportSlice,
});

export default rootReducer;
