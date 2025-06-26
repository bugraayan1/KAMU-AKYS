import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ideas: [],
  selectedIdea: null,
  loading: false,
  error: null,
};

const ideaSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    fetchIdeasStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchIdeasSuccess(state, action) {
      state.loading = false;
      state.ideas = action.payload;
    },
    fetchIdeasFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedIdea(state, action) {
      state.selectedIdea = action.payload;
    },
    clearSelectedIdea(state) {
      state.selectedIdea = null;
    },
  },
});

export const {
  fetchIdeasStart,
  fetchIdeasSuccess,
  fetchIdeasFailure,
  setSelectedIdea,
  clearSelectedIdea,
} = ideaSlice.actions;
export default ideaSlice.reducer; 