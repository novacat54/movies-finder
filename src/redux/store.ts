import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from './moviesSlice';

const store = configureStore({
  preloadedState: {},
  reducer: {
    movies: moviesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
