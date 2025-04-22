import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  report: [],
  type: "month",
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
  },
});

export const { setReport, setType } = reportSlice.actions;

export default reportSlice.reducer;
