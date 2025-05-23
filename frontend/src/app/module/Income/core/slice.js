import { createSlice } from "@reduxjs/toolkit";

const initIncome = {
  category: "",
  amount: "",
  date: "",
  note: "",
};

const initialState = {
  income: [],
  incomeInfo: initIncome,
  incomeDetails: {},
  loadData: {},
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    setIncome: (state, action) => {
      state.income = action.payload;
    },

    setIncomeInfo: (state, action) => {
      const data = action.payload;
      state.incomeInfo[data.name] = data.value;
    },

    resetIncomeInfo: (state) => {
      state.incomeInfo = initIncome;
    },

    setIncomeDetails: (state, action) => {
      state.incomeDetails = action.payload;
    },

    setIncomeDetailsInfo: (state, action) => {
      const { name, value } = action.payload;
      state.incomeDetails[name] = value;
    },

    setLoadData: (state, action) => {
      state.loadData = action.payload;
    },
  },
});

export const {
  setIncome,
  setIncomeInfo,
  resetIncomeInfo,
  setIncomeDetails,
  setIncomeDetailsInfo,
  setLoadData,
} = incomeSlice.actions;

export default incomeSlice.reducer;
