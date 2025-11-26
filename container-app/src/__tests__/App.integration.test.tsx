import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import filterReducer, {
  initialState as filterInitialState,
} from '../store/slices/filterSlice';
import reportReducer, {
  initialState as reportInitialState,
} from '../store/slices/reportSlice';
import chartReducer, {
  initialState as chartInitialState,
} from '../store/slices/chartSlice';
import type { RootState } from '../store';
import '@testing-library/jest-dom';

// Mock the remote components
jest.mock('chartApp/BarChart', () => ({
  __esModule: true,
  default: ({ data }: { data: any[] }) => (
    <div data-testid="bar-chart">Bar Chart with {data.length} items</div>
  ),
}));

jest.mock('chartApp/PieChart', () => ({
  __esModule: true,
  default: ({
    onCategoryClick,
  }: {
    onCategoryClick: (category: string) => void;
  }) => (
    <div data-testid="pie-chart" onClick={() => onCategoryClick('Electronics')}>
      Pie Chart
    </div>
  ),
}));

// Helper function to render the app with Redux store
const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {
      filter: filterInitialState,
      report: reportInitialState,
      chart: chartInitialState,
    },
    ...renderOptions
  }: {
    preloadedState?: Partial<RootState>;
  } = {}
) => {
  const store = configureStore({
    reducer: {
      filter: filterReducer as any, // Temporary fix
      report: reportReducer as any, // Temporary fix
      chart: chartReducer as any, // Temporary fix
    },
    preloadedState,
  });

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};

describe('App Integration', () => {
  test('should render the dashboard with initial state', () => {
    renderWithProviders(<App />);

    // Verify main elements are rendered
    expect(screen.getByText('Product Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Products Categories')).toBeInTheDocument();

    // Verify Run Report button is disabled initially
    const runButton = screen.getByRole('button', { name: /run report/i });
    expect(runButton).toBeInTheDocument();
    expect(runButton).toBeDisabled();
  });

  test('should allow selecting a category and products', async () => {
    renderWithProviders(<App />);

    // Select a category
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });

    // Verify products are enabled
    const productCheckbox = await screen.findByLabelText('Product 1');
    expect(productCheckbox).not.toBeDisabled();

    // Select a product
    fireEvent.click(productCheckbox);

    // Verify Run Report button is enabled
    const runButton = screen.getByRole('button', { name: /run report/i });
    expect(runButton).not.toBeDisabled();

    // Click Run Report
    fireEvent.click(runButton);

    // Verify bar chart is shown
    await waitFor(() => {
      expect(screen.getByText('Products Analysis')).toBeInTheDocument();
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
  });

  test('should handle category selection from pie chart', async () => {
    const { store } = renderWithProviders(<App />);

    // Click on pie chart (which will trigger onCategoryClick with 'Electronics')
    const pieChart = await screen.findByTestId('pie-chart');
    fireEvent.click(pieChart);

    // Verify category is selected in the filter
    const state = store.getState() as RootState;
    expect(state.filter.selectedCategory).toBe('Electronics');
  });
});
