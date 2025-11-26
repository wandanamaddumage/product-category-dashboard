import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportState {
  hasRun: boolean;
  filtersChanged: boolean;
  submittedProducts: string[]; // Track which products were submitted
}

export const initialState: ReportState = {
  hasRun: false,
  filtersChanged: false,
  submittedProducts: [],
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setHasRun: (state, action: PayloadAction<boolean>) => {
      state.hasRun = action.payload;
    },
    setFiltersChanged: (state, action: PayloadAction<boolean>) => {
      state.filtersChanged = action.payload;
    },
    submitReport: (state, action: PayloadAction<string[]>) => {
      state.hasRun = true;
      state.filtersChanged = false;
      state.submittedProducts = action.payload; // Save the selected products
    },
    resetReport: state => {
      state.hasRun = false;
      state.filtersChanged = false;
      state.submittedProducts = [];
    },
  },
});

export const { setHasRun, setFiltersChanged, submitReport, resetReport } =
  reportSlice.actions;
export default reportSlice.reducer;
