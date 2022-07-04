import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProjectsState {
  projects: { app_id: string; name: string; platform: string }[];
}

const initialState: ProjectsState = {
  projects: [],
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (
      state,
      action: PayloadAction<
        { app_id: string; name: string; platform: string }[]
      >
    ) => {
      state.projects = action.payload;
    },
    addProject: (
      state,
      action: PayloadAction<{ app_id: string; name: string; platform: string }>
    ) => {
      state.projects = [...state.projects, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProjects, addProject } = projectSlice.actions;

export default projectSlice.reducer;
