import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './slices/chartSlice';
import filterReducer from './slices/filterSlice';
import reportReducer from './slices/reportSlice';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    filter: filterReducer,
    report: reportReducer,
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
