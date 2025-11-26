import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChartState {
  pieData: Array<{ category: string; value: number }>;
  columnData: Array<{ category: string; value: number }>;
  showColumnChart: boolean;
}

const initialState: ChartState = {
  pieData: [],
  columnData: [],
  showColumnChart: false,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setPieData(
      state: ChartState,
      action: PayloadAction<ChartState['pieData']>
    ) {
      state.pieData = action.payload;
    },

    setColumnData(
      state: ChartState,
      action: PayloadAction<ChartState['columnData']>
    ) {
      state.columnData = action.payload;
    },

    setShowColumnChart(state: ChartState, action: PayloadAction<boolean>) {
      state.showColumnChart = action.payload;
    },
  },
});

export const { setPieData, setColumnData, setShowColumnChart } =
  chartSlice.actions;

export default chartSlice.reducer;
