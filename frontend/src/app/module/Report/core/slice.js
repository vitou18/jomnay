import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  report: [],
  type: "month",
  format: "csv",
  loading: false,
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

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setReport, setType, setFormat, setLoading } =
  reportSlice.actions;

export default reportSlice.reducer;
