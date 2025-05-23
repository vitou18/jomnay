import { createSlice } from "@reduxjs/toolkit";

const initExpense = {
  category: "",
  amount: "",
  date: "",
  note: "",
};

const initialState = {
  expense: [],
  expenseInfo: initExpense,
  expenseDetails: {},
  loadData: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (state, action) => {
      state.expense = action.payload;
    },

    setExpenseInfo: (state, action) => {
      const data = action.payload;

      state.expenseInfo[data.name] = data.value;
    },

    resetExpenseInfo: (state) => {
      state.expenseInfo = initExpense;
    },

    setExpenseDetails: (state, action) => {
      state.expenseDetails = action.payload;
    },

    setExpenseDetailsInfo: (state, action) => {
      const { name, value } = action.payload;

      state.expenseDetails[name] = value;
    },

    setLoadData: (state, action) => {
      state.loadData = action.payload;
    },
  },
});

export const {
  setExpense,
  setExpenseInfo,
  resetExpenseInfo,
  setExpenseDetails,
  setExpenseDetailsInfo,
  setLoadData,
} = expenseSlice.actions;

export default expenseSlice.reducer;
