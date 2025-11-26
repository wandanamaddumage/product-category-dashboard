import { render, screen } from '@testing-library/react';
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
import BarChart from '../components/BarChart';
import '@testing-library/jest-dom';

describe('BarChart Integration', () => {
  const mockData = [
    {
      id: 1,
      title: 'Product 1',
      category: 'Electronics',
      price: 100,
      sales: 50,
    },
    {
      id: 2,
      title: 'Product 2',
      category: 'Electronics',
      price: 200,
      sales: 30,
    },
    { id: 3, title: 'Product 3', category: 'Clothing', price: 50, sales: 80 },
  ];

  it('renders with provided data', () => {
    render(<BarChart data={mockData} isDark={false} />);

    // Check if the chart is rendered
    const chart = screen.getByTestId('mock-highcharts');
    expect(chart).toBeInTheDocument();
  });

  it('shows individual products when 5 or fewer items', () => {
    render(<BarChart data={mockData.slice(0, 2)} isDark={false} />);

    // Check if the chart is rendered with the correct number of data points
    const chart = screen.getByTestId('mock-highcharts');
    expect(chart).toHaveAttribute('options');

    // Check if the data is passed correctly
    const options = JSON.parse(chart.getAttribute('options') || '{}');
    expect(options.series[0].data).toHaveLength(2);
  });

  it('groups by category when more than 5 items', () => {
    // Create more than 5 items
    const manyProducts = Array(6)
      .fill(0)
      .map((_, i) => ({
        id: i + 1,
        title: `Product ${i + 1}`,
        category: i % 2 === 0 ? 'Electronics' : 'Clothing',
        price: (i + 1) * 100,
        sales: (i + 1) * 10,
      }));

    render(<BarChart data={manyProducts} isDark={false} />);

    // Check if the chart is rendered with the correct number of data points
    const chart = screen.getByTestId('mock-highcharts');
    expect(chart).toHaveAttribute('options');

    // Check if the data is passed correctly
    const options = JSON.parse(chart.getAttribute('options') || '{}');
    expect(options.series[0].data).toHaveLength(2); // Should be grouped into 2 categories
  });

  it('applies dark theme when isDark is true', () => {
    render(<BarChart data={mockData} isDark={true} />);

    // Check if the chart is rendered with isDark prop
    const chart = screen.getByTestId('mock-highcharts');
    expect(chart).toHaveAttribute('isDark', 'true');
  });
});
