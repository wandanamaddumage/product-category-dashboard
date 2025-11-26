import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import {
  setColumnData,
  setPieData,
  setShowColumnChart,
} from '../store/slices/chartSlice';
import {
  generateColumnChartData,
  generatePieChartData,
} from '../utils/chartDataGenerator';

export function useChartData() {
  const dispatch = useDispatch();
  const { selectedCategory, selectedProducts } = useSelector(
    (state: RootState) => state.filter
  );
  const { hasRun } = useSelector((state: RootState) => state.report);
  const chartState = useSelector((state: RootState) => state.chart);

  useEffect(() => {
    const pieData = generatePieChartData();
    dispatch(setPieData(pieData));
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    if (hasRun && selectedCategory) {
      const columnData = generateColumnChartData(
        selectedCategory,
        selectedProducts
      );
      dispatch(setColumnData(columnData));
      dispatch(setShowColumnChart(true));
    }
  }, [hasRun, selectedCategory, selectedProducts, dispatch]);

  return chartState;
}
