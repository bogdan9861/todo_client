import { applyMiddleware, configureStore, Tuple } from "@reduxjs/toolkit";
import { listener } from "../middleware/middleware";

import auth from "../features/authSlice";
import project from "../features/projectSlice";
import { api } from "../service/api";

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer, auth, project },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).prepend(listener.middleware),
});
