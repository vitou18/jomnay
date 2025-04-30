import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboard: [],
  loadData: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },

    setLoadData: (state, action) => {
      state.loadData = action.payload;
    },
  },
});

export const { setDashboard, setLoadData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
