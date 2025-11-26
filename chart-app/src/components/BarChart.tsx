import {
  Box,
} from '@chakra-ui/react';
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
  data: Product[]; // host passes filteredProducts
  isDark?: boolean;
};

function BarChart({ data, isDark = false }: BarChartProps) {
  const chartRef = useRef<HighchartsReactComponent.RefObject>(null);

  // If we have 5 or fewer products, show them individually, otherwise group by category
  const showIndividualProducts = data.length <= 5;

  const chartData = useMemo((): ChartDataPoint[] => {
    if (showIndividualProducts) {
      // Show individual products
      return data.map(product => ({
        name: product.title,
        y: product.sales,
        category: product.category,
        price: product.price
      }));
    }
    
    // Group by category
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

  // Modern color palette matching the pie chart
  const CATEGORY_COLORS: Record<string, string> = {
    'Electronics': '#667eea',
    'Furniture': '#f093fb',
    'Kitchen': '#4facfe',
    'Sports': '#43e97b',
    'Bags': '#fa709a',
  };
  
  // Define the shape of our chart data point
  interface ChartDataPoint {
    name: string;
    y: number;
    category?: string;
    price?: number;
  }

  // Get color based on category or use a fallback
  const getBarColor = (item: { category?: string }) => {
    return item.category ? (CATEGORY_COLORS[item.category] || '#667eea') : '#667eea';
  };

  const options: Highcharts.Options = {
    chart: { 
      type: 'column', 
      backgroundColor: 'transparent',
      height: '100%',
      style: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      },
      animation: {
        duration: 800
      }
    },
    title: {
      text: '',
      style: { display: 'none' }
    },
    xAxis: { 
      type: 'category',
      labels: {
        style: {
          color: isDark ? '#e2e8f0' : '#4a5568',
          fontSize: '13px',
          fontWeight: '600'
        },
        rotation: 0
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
        data: sortedData.map(item => ({
          name: item.name,
          y: item.y,
          color: getBarColor(item),
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
          hover: {
            brightness: 0.15,
            borderColor: 'transparent'
          }
        }
      },
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
      formatter: function(this: Highcharts.Point) {
        const point = this as unknown as ChartDataPoint & { y: number, name?: string, category?: string };
        return `
          <div style="text-align: center; min-width: 120px;">
            <div style="font-weight: 700; color: #2d3748; margin-bottom: 4px;">
              ${point.name || 'N/A'}
            </div>
            ${point.category ? `<div style="color: #718096; font-size: 12px; margin-bottom: 2px;">
              ${point.category}
            </div>` : ''}
            <div style="font-weight: 600; color: #4a5568;">
              <b>${point.y}</b> units sold
            </div>
            ${point.price ? `<div style="color: #718096; font-size: 11px; margin-top: 2px;">
              $${point.price.toFixed(2)}
            </div>` : ''}
          </div>
        `;
      },
      shadow: {
        offsetX: 0,
        offsetY: 2,
        width: 6,
        opacity: 0.1
      }
    },
    credits: { enabled: false },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            xAxis: {
              labels: {
                style: {
                  fontSize: '11px'
                },
                rotation: -45
              }
            },
            yAxis: {
              title: {
                text: 'Sales',
                style: {
                  fontSize: '11px'
                }
              },
              labels: {
                style: {
                  fontSize: '10px'
                }
              }
            },
            plotOptions: {
              column: {
                dataLabels: {
                  enabled: true,
                  style: {
                    fontSize: '11px'
                  }
                }
              }
            }
          }
        }
      ]
    }
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