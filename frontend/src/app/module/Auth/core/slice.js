import { createSlice } from "@reduxjs/toolkit";

const loginUser = {
  email: "",
  password: "",
};

const createUser = {
  fullName: "",
  email: "",
  password: "",
  cpassword: "",
};

const initialState = {
  login: loginUser,
  profile: JSON.parse(localStorage.getItem("user") ?? "{}"),
  accessToken: localStorage.getItem("access_token"),
  register: createUser,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("access_token", action.payload);
    },

    setProfile: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setLogin: (state, action) => {
      const data = action.payload;

      state.login[data.name] = data.value;
    },

    setLogout: (state) => {
      state.accessToken = null;
      state.profile = {};
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },

    setRegister: (state, action) => {
      const data = action.payload;

      state.register[data.name] = data.value;
    },

    resetRegister: (state) => {
      state.register = createUser;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setAccessToken,
  setProfile,
  setLogin,
  setLogout,
  setRegister,
  resetRegister,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
