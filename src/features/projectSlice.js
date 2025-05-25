import { createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../service/auth";
import { projectsApi } from "../service/projects";
import { tasksApi } from "../service/tasks";

const initialState = {
  projects: [{}],
  project: null,
  selectedTask: null,
  isMenuOpen: false,
};

export const projectSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    setselectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      projectsApi.endpoints.getProjects.matchFulfilled,
      (state, action) => {
        state.projects = action.payload;
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.updateProject.matchFulfilled,
      (state, action) => {
        state.project = action.payload;
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.createProject.matchFulfilled,
      (state, action) => {
        state.projects.push(action.payload);
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.getProjectsById.matchFulfilled,
      (state, action) => {
        state.project = action.payload;
      }
    );
    builder.addMatcher(
      tasksApi.endpoints.updateTasks.matchFulfilled,
      (state, action) => {
        state.project.tasks.forEach((task, i) => {
          if (task.id === action.payload.id) {
            state.project.tasks[i] = action.payload;
          }
        });
      }
    );
    builder.addMatcher(
      tasksApi.endpoints.delteTask.matchFulfilled,
      (state, action) => {
        state.project.tasks = state.project.tasks.filter(
          (task) => task.id !== action.payload.id
        );
        state.project.selectedTask = null;
        state.isMenuOpen = false;
      }
    );
    builder.addMatcher(
      tasksApi.endpoints.createTasks.matchFulfilled,
      (state, action) => {
        state.project.tasks.push(action.payload);
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.deleteProject.matchFulfilled,
      (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload.id
        );
      }
    );
  },
});

export const { setIsMenuOpen, setselectedTask } = projectSlice.actions;

export default projectSlice.reducer;
