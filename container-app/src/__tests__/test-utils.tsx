import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../store';
import chartReducer, {
  initialState as initialChartState,
} from '../store/slices/chartSlice';
import filterReducer, {
  initialState as initialFilterState,
} from '../store/slices/filterSlice';
import reportReducer, {
  initialState as initialReportState,
} from '../store/slices/reportSlice';

// Mock the remote components that are dynamically imported
jest.mock('chart-app/BarChart', () => ({
  __esModule: true,
  default: ({ data }: { data: any[] }) => (
    <div data-testid="bar-chart">Bar Chart with {data.length} items</div>
  ),
}));

jest.mock('chart-app/PieChart', () => ({
  __esModule: true,
  default: ({
    data,
    onCategoryClick,
  }: {
    data: any[];
    onCategoryClick: (category: string) => void;
  }) => (
    <div
      data-testid="pie-chart"
      onClick={() => onCategoryClick?.(data[0]?.category || '')}
    >
      Pie Chart with {data.length} items
    </div>
  ),
}));

// Mock the product data
jest.mock('../../const/productData', () => ({
  getPieChartData: jest.fn(() => [
    { name: 'Category 1', y: 30, category: 'electronics' },
    { name: 'Category 2', y: 20, category: 'clothing' },
  ]),
  getProductsByCategory: jest.fn(() => [
    { id: 1, name: 'Product 1', category: 'electronics', price: 100 },
    { id: 2, name: 'Product 2', category: 'electronics', price: 200 },
  ]),
  productsData: [
    { id: 1, name: 'Product 1', category: 'electronics', price: 100 },
    { id: 2, name: 'Product 2', category: 'electronics', price: 200 },
    { id: 3, name: 'Product 3', category: 'clothing', price: 50 },
  ],
}));

// Create a custom render with providers
// Helper function to create a test store with preloaded state
const setupStore = (preloadedState: Partial<RootState> = {}) => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      report: reportReducer,
      chart: chartReducer,
    },
    preloadedState: {
      filter: { ...initialFilterState, ...preloadedState.filter },
      report: { ...initialReportState, ...preloadedState.report },
      chart: { ...initialChartState, ...preloadedState.chart },
    },
  });
};

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: {
    preloadedState?: Partial<RootState>;
    store?: ReturnType<typeof setupStore>;
  } & Omit<RenderOptions, 'queries'> = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ChakraProvider>
      <Provider store={store}>{children}</Provider>
    </ChakraProvider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Re-export everything
export * from '@testing-library/react';
// Override render method
export { customRender as render };
