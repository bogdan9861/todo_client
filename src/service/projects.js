import { useSelector } from "react-redux";
import { api } from "./api";

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        body: data,
        method: "POST",
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        body: data,
        method: "PUT",
      }),
    }),
    getProjectsById: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "POST",
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
  useGetProjectsByIdMutation,
  useDeleteProjectMutation,
} = projectsApi;
