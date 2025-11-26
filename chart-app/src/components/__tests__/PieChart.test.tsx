import React from 'react';
import { render, screen } from '../../test-utils';
import PieChart from '../PieChart';

// Mock HighchartsReact
jest.mock('highcharts-react-official', () => {
  return jest.fn(({ options, callback }) => {
    // Simulate chart load
    React.useEffect(() => {
      if (callback && callback.chart) {
        const chartInstance = {
          update: jest.fn(),
          series: [
            {
              points: [
                {
                  name: 'Electronics',
                  category: 'electronics',
                  selected: false,
                },
                { name: 'Clothing', category: 'clothing', selected: false },
              ],
            },
          ],
        };
        callback.chart({ chart: chartInstance });
      }
    }, []);

    return (
      <div data-testid="piechart-mock" data-options={JSON.stringify(options)} />
    );
  });
});

describe('PieChart', () => {
  const mockData = [
    { name: 'Electronics', y: 30, category: 'electronics' },
    { name: 'Clothing', y: 20, category: 'clothing' },
  ];

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with correct data', () => {
    render(
      <PieChart data={mockData} onCategoryClick={mockOnClick} isDark={false} />
    );
    const chart = screen.getByTestId('piechart-mock');
    expect(chart).toBeInTheDocument();

    const options = JSON.parse(chart.getAttribute('data-options') || '{}');
    expect(options.series[0].data).toHaveLength(2);
  });

  it('calls onCategoryClick when a slice is clicked', () => {
    render(
      <PieChart data={mockData} onCategoryClick={mockOnClick} isDark={false} />
    );

    // Simulate click on a pie slice
    const chart = screen.getByTestId('piechart-mock');
    const options = JSON.parse(chart.getAttribute('data-options') || '{}');

    // Find and click the first point
    const point = options.series[0].data[0];
    const clickHandler = options.plotOptions?.pie?.point?.events?.click;

    if (clickHandler) {
      clickHandler.call({ category: point.category });
      expect(mockOnClick).toHaveBeenCalledWith(point.category);
    } else {
      throw new Error('Click handler not found');
    }
  });

  it('applies dark theme when isDark is true', () => {
    render(
      <PieChart data={mockData} onCategoryClick={mockOnClick} isDark={true} />
    );
    const chart = screen.getByTestId('piechart-mock');
    const options = JSON.parse(chart.getAttribute('data-options') || '{}');

    // Check if dark theme is applied
    expect(options.chart?.backgroundColor).toBe('#1A202C');
    expect(options.title?.style?.color).toBe('#E2E8F0');
  });
});
