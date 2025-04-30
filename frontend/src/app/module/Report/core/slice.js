import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  report: [],
  type: "month",
  format: "csv",
  loadData: false,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport: (state, action) => {
      state.report = action.payload;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },

    setFormat: (state, action) => {
      state.format = action.payload;
    },

    setLoadData: (state, action) => {
      state.loadData = action.payload;
    },
  },
});

export const { setReport, setType, setFormat, setLoadData } = reportSlice.actions;

export default reportSlice.reducer;
