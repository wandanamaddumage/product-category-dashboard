import { call, put, select, takeLatest } from 'redux-saga/effects';
import type { RootState } from './index';
import {
  setColumnData,
  setPieData,
  setShowColumnChart,
} from './slices/chartSlice';

// Mock function to generate chart data based on filters
function generateChartData(
  category: string,
  products: number[]
): {
  pieData: Array<{ category: string; value: number }>;
  columnData: Array<{ category: string; value: number }>;
} {
  // Sample data generation
  const pieData = [
    { category: 'Electronics', value: 30 },
    { category: 'Furniture', value: 25 },
    { category: 'Groceries', value: 25 },
    { category: 'Beauty', value: 20 },
  ];

  const columnData = products.length
    ? [
        {
          category: `${category} - Selected Products (${products.length})`,
          value: Math.random() * 100,
        },
      ]
    : [{ category: category, value: Math.random() * 100 }];

  return { pieData, columnData };
}

function* handleRunReport(): Generator {
  try {
    const state: RootState = yield select();
    const { selectedCategory, selectedProducts } = state.filter;

    if (!selectedCategory) return;

    // Generate chart data based on filters
    const { pieData, columnData } = yield call(
      generateChartData,
      selectedCategory,
      selectedProducts
    );

    // Update chart data in store
    yield put(setPieData(pieData));
    yield put(setColumnData(columnData));
    yield put(setShowColumnChart(true));
    yield put(setRunReportLoading(false));
  } catch (error) {
    console.error('Error running report:', error);
    yield put(setRunReportLoading(false));
  }
}

export default function* rootSaga() {
  yield takeLatest('report/setRunReportLoading', handleRunReport);
}
function setRunReportLoading(_arg0: boolean): any {
  throw new Error('Function not implemented.');
}
