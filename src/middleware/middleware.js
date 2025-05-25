import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AuthApi } from "../service/auth";

export const listener = createListenerMiddleware();

listener.startListening({
  matcher: AuthApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("todo-token", action.payload.token);
    }
  },
});
