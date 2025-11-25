import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ReportState {
  isLoading: boolean;
  hasRun: boolean;
}

const initialState: ReportState = {
  isLoading: false,
  hasRun: false,
};

/**
 * Report Slice
 * - Manages Run Report button state and loading
 */
const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setRunReportLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.hasRun = true;
      }
    },
  },
});

export const { setRunReportLoading } = reportSlice.actions;
export default reportSlice.reducer;
