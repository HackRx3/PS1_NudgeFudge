import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import projectsReducer from "./projects.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
