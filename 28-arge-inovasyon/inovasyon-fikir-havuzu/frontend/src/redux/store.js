import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import ideaReducer from './slices/ideaSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ideas: ideaReducer,
  },
});

export default store; 