import { useSelector } from "react-redux";
import { api } from "./api";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTasks: builder.mutation({
      query: (data) => ({
        url: "/tasks/",
        method: "POST",
        body: data,
      }),
    }),
    updateTasks: builder.mutation({
      query: (data) => ({
        url: "/tasks/",
        method: "PUT",
        body: data,
      }),
    }),
    delteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTasksMutation,
  useUpdateTasksMutation,
  useDelteTaskMutation,
} = tasksApi;
