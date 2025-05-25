import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/api`;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.user?.token || localStorage.getItem("todo-token");

    if (token && token !== null) {
      headers.set("authorization", `Bearer ${token}`);
    }
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
