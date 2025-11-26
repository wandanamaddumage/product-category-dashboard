// src/store/reportSlice.ts
import { createSlice } from '@reduxjs/toolkit';

type ReportState = {
  hasRun: boolean;
};

const initialState: ReportState = { hasRun: false };

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    runReport(state) {
      state.hasRun = true;
    },
    resetReport(state) {
      state.hasRun = false;
    },
  },
});

export const { runReport, resetReport } = reportSlice.actions;
export default reportSlice.reducer;
