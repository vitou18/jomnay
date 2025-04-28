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
  loading: false,
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

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setIncome,
  setIncomeInfo,
  resetIncomeInfo,
  setIncomeDetails,
  setIncomeDetailsInfo,
  setLoading,
} = incomeSlice.actions;

export default incomeSlice.reducer;
