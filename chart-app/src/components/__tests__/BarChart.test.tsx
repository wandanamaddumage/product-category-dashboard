import { render, screen } from '../../test-utils';
import BarChart from '../BarChart';

// Mock HighchartsReact
jest.mock('highcharts-react-official', () => {
  return jest.fn(({ options }) => (
    <div data-testid="barchart-mock" data-options={JSON.stringify(options)} />
  ));
});

describe('BarChart', () => {
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
      category: 'Clothing',
      price: 200,
      sales: 30,
    },
  ];

  it('renders with correct data', () => {
    render(<BarChart data={mockData} />);
    const chart = screen.getByTestId('barchart-mock');
    expect(chart).toBeInTheDocument();
  });

  it('shows individual products when 5 or fewer items', () => {
    render(<BarChart data={mockData} />);
    const chart = screen.getByTestId('barchart-mock');
    const options = JSON.parse(chart.getAttribute('data-options') || '{}');
    expect(options.series[0].data).toHaveLength(2);
    expect(options.series[0].data[0].name).toBe('Product 1');
    expect(options.series[0].data[0].y).toBe(50);
  });

  it('groups by category when more than 5 items', () => {
    const manyProducts = Array(6)
      .fill(0)
      .map((_, i) => ({
        id: i + 1,
        title: `Product ${i + 1}`,
        category: i % 2 === 0 ? 'Electronics' : 'Clothing',
        price: (i + 1) * 100,
        sales: (i + 1) * 10,
      }));

    render(<BarChart data={manyProducts} />);
    const chart = screen.getByTestId('barchart-mock');
    const options = JSON.parse(chart.getAttribute('data-options') || '{}');

    // Should have 2 categories
    expect(options.series[0].data).toHaveLength(2);

    // Check if categories are correct
    const categories = options.series[0].data.map((d: any) => d.name);
    expect(categories).toContain('Electronics');
    expect(categories).toContain('Clothing');
  });

  it('applies dark theme when isDark is true', () => {
    render(<BarChart data={mockData} isDark={true} />);
    const chart = screen.getByTestId('barchart-mock');
    const options = JSON.parse(chart.getAttribute('data-options') || '{}');

    // Check if dark theme is applied
    expect(options.chart?.backgroundColor).toBe('#1A202C');
    expect(options.title?.style?.color).toBe('#E2E8F0');
  });
});
