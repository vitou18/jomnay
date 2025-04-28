import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboard: [],
  loading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setDashboard, setLoading } = dashboardSlice.actions;

export default dashboardSlice.reducer;
