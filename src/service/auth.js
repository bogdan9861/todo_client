import { useSelector } from "react-redux";
import { api } from "./api";

export const AuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/users/login",
        body: userData,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        body: userData,
        method: "POST",
      }),
    }),
    current: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useCurrentQuery, useRegisterMutation } =
  AuthApi;

export const selectUser = (state) => state.auth.user;
