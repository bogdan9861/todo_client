import { useSelector } from "react-redux";
import { api } from "./api";

export const statusApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatuses: builder.query({
      query: (data) => ({
        url: "/statuses/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStatusesQuery } = statusApi;
