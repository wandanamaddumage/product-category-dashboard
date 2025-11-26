import { Box } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReactImport from 'highcharts-react-official';
import type HighchartsReactComponent from 'highcharts-react-official';
import { useMemo, useRef } from 'react';
import type { Product } from '../../../const/productData';

const resolveHighchartsReact = (mod: any) => {
  if (typeof mod === 'function') return mod;
  if (mod?.HighchartsReact) return mod.HighchartsReact;
  if (mod?.default) return resolveHighchartsReact(mod.default);
  return mod;
};

const HighchartsReact = resolveHighchartsReact(HighchartsReactImport);

type BarChartProps = {
  data: Product[];
  isDark?: boolean;
};

interface ChartDataPoint {
  name: string;
  y: number;
  category?: string;
  price?: number;
}

function BarChart({ data, isDark = false }: BarChartProps) {
  const chartRef = useRef<HighchartsReactComponent.RefObject>(null);

  const showIndividualProducts = data.length <= 5;

  const chartData = useMemo((): ChartDataPoint[] => {
    if (showIndividualProducts) {
      return data.map(product => ({
        name: product.title,
        y: product.sales,
        category: product.category,
        price: product.price
      }));
    }

    const map = new Map<string, number>();
    data.forEach(p =>
      map.set(p.category, (map.get(p.category) || 0) + p.sales)
    );

    return Array.from(map.entries()).map(([name, y]) => ({
      name,
      y,
      category: name
    }));
  }, [data, showIndividualProducts]);

  const sortedData = [...chartData].sort((a, b) => b.y - a.y);

  /**
   * Generate a consistent color palette based on the brand color
   * Creates variations of the base brand color for chart segments
   */
  const MODERN_COLORS = useMemo(() => {
    const baseColor = '#845ddeff';
    const colors: string[] = [];

    for (let i = 0; i < 8; i++) {
      const brightness = (i - 3) / 7;
      const color = Highcharts.color(baseColor).brighten(brightness).get() as string;
      colors.push(color);
    }

    return colors;
  }, []);

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 'auto',
      style: {
        minHeight: '500px',
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        boxSizing: 'border-box'
      },
      animation: { duration: 800 }
    },
    title: { text: '' },

    xAxis: {
      type: 'category',
      labels: {
        style: {
          color: isDark ? '#e2e8f0' : '#4a5568',
          fontSize: '13px',
          fontWeight: '600'
        }
      },
      lineColor: '#e2e8f0',
      tickColor: '#e2e8f0'
    },

    yAxis: {
      title: {
        text: 'Total Sales (units)',
        style: {
          color: isDark ? '#cbd5e0' : '#718096',
          fontSize: '13px',
          fontWeight: '600'
        }
      },
      labels: {
        style: {
          color: isDark ? '#cbd5e0' : '#718096',
          fontSize: '12px'
        }
      },
      gridLineColor: '#f7fafc',
      gridLineDashStyle: 'Dash'
    },

    series: [
      {
        type: 'column',
        name: 'Sales',
        data: sortedData.map((item, idx) => ({
          name: item.name,
          y: item.y,
          color: MODERN_COLORS[idx % MODERN_COLORS.length],
          category: item.category,
          custom: {
            name: item.name,
            category: item.category,
            sales: item.y,
            price: item.price
          }
        })),
        showInLegend: false
      }
    ],

    plotOptions: {
      column: {
        borderRadius: 8,
        borderWidth: 0,
        pointPadding: 0.1,
        groupPadding: 0.15,
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          style: {
            textOutline: 'none',
            color: isDark ? '#f3f4f6' : '#2d3748',
            fontSize: '13px',
            fontWeight: '700'
          },
          y: -8
        },
        states: {
          hover: { brightness: 0.15 }
        }
      }
    },

    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      padding: 12,
      style: {
        fontSize: '13px',
        fontWeight: '500'
      },
      useHTML: true,
      formatter: function () {
        const p = this.points as any;
        return `
          <div style="text-align: center;">
            <div style="font-weight: 700; color: #2d3748;">${p.name}</div>
            ${p.category ? `<div style="color:#718096; font-size:12px;">${p.category}</div>` : ''}
            <div style="color:#4a5568;"><b>${p.y}</b> units sold</div>
            ${
              p.custom?.price
                ? `<div style="color:#718096; font-size:11px;">$${p.custom.price.toFixed(2)}</div>`
                : ''
            }
          </div>
        `;
      }
    },

    credits: { enabled: false }
  };

  return (
    <Box
      w="100%"
      h="100%"
      minH={{ base: '300px', md: '350px', lg: '400px' }}
      position="relative"
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        containerProps={{ style: { height: '100%', width: '100%' } }}
      />
    </Box>
  );
}

export default BarChart;
