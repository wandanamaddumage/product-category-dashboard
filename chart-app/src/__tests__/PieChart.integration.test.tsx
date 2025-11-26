import { render, screen, fireEvent } from '@testing-library/react';
// Mock Highcharts
jest.mock('highcharts-react-official', () => {
  return function MockHighchartsReact(props: any) {
    return <div data-testid="mock-highcharts" {...props} />;
  };
});

// Mock Highcharts
jest.mock('highcharts', () => ({
  chart: jest.fn(),
  getOptions: jest.fn(),
  setOptions: jest.fn(),
  color: jest.fn().mockReturnValue({
    brighten: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue('#845dde'),
    }),
  }),
}));
import PieChart from '../components/PieChart';
import '@testing-library/jest-dom';

describe('PieChart Integration', () => {
  const mockData = [
    { name: 'Electronics', y: 30, category: 'electronics' },
    { name: 'Clothing', y: 20, category: 'clothing' },
  ];

  it('renders with provided data', () => {
    const mockOnClick = jest.fn();

    render(
      <PieChart data={mockData} onCategoryClick={mockOnClick} isDark={false} />
    );

    // Check if the chart is rendered
    const chart = screen.getByTestId('mock-highcharts');
    expect(chart).toBeInTheDocument();
  });

  it('calls onCategoryClick when a slice is clicked', async () => {
    const mockOnClick = jest.fn();

    render(
      <PieChart data={mockData} onCategoryClick={mockOnClick} isDark={false} />
    );

    // Simulate clicking on the chart
    const chart = screen.getByTestId('mock-highcharts');
    fireEvent.click(chart);

    // Check if the click handler was called
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('applies dark theme when isDark is true', () => {
    const mockOnClick = jest.fn();

    render(
      <PieChart data={mockData} onCategoryClick={mockOnClick} isDark={true} />
    );

    // Check if the chart is rendered with isDark prop
    const chart = screen.getByTestId('mock-highcharts');
    expect(chart).toHaveAttribute('isDark', 'true');
  });
});
