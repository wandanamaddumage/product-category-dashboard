import { createSlice } from '@reduxjs/toolkit';

type ReportState = {
  hasRun: boolean;
  filtersChanged: boolean;
};

const initialState: ReportState = { 
  hasRun: false,
  filtersChanged: false,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    runReport(state) {
      state.hasRun = true;
      state.filtersChanged = false;
    },
    resetReport(state) {
      state.hasRun = false;
      state.filtersChanged = false;
    },
    setFiltersChanged(state, action) {
      state.filtersChanged = action.payload;
    },
  },
});

export const { runReport, resetReport, setFiltersChanged } = reportSlice.actions;
export default reportSlice.reducer;