import { createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../service/auth";

const initialState = {
  user: {
    name: "",
    login: "",
    token: "",
  },
  isAuthentificated: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthentificated = true;
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.current.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthentificated = true;
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.register.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthentificated = true;
      }
    );
  },
});

export default authSlice.reducer;
