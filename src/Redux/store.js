import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import authReducer from './authSlice'; 

const store = configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
  },
});

export default store;
