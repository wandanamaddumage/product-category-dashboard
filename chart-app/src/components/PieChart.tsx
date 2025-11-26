import { Box } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReactImport from 'highcharts-react-official';
import type HighchartsReactComponent from 'highcharts-react-official';
import { Suspense, useMemo, useRef } from 'react';

const resolveHighchartsReact = (mod: any) => {
  if (typeof mod === 'function') return mod;
  if (mod?.HighchartsReact) return mod.HighchartsReact;
  if (mod?.default) return resolveHighchartsReact(mod.default);
  return mod;
};

const HighchartsReact = resolveHighchartsReact(HighchartsReactImport);

/**
 * Represents a single data point in the pie chart
 */
interface PiePoint {
  name: string;
  y: number;
  category?: string;
}

/**
 * Props for the PieChart component
 */
type PieChartProps = {
  data: PiePoint[];
  onCategoryClick: (category: string) => void;
  isDark: boolean;
};

function PieChart({ data, onCategoryClick, isDark }: PieChartProps) {
  const chartRef = useRef<HighchartsReactComponent.RefObject>(null);

  /**
   * Generate a consistent color palette based on the brand color
   * Creates variations of the base brand color for better visual distinction
   */
  const MODERN_COLORS = useMemo(() => {
    const baseColor = '#845ddeff'; // Base brand color
    const colors: string[] = [];
    
    // Generate 8 color variations with different brightness levels
    for (let i = 0; i < 8; i++) {
      // Calculate brightness from -0.43 to 0.71 for a smooth gradient
      const brightness = (i - 3) / 7;
      const color = Highcharts.color(baseColor).brighten(brightness).get() as string;
      colors.push(color);
    }
    
    return colors;
  }, []);

  /**
   * Highcharts configuration options
   * Defines the appearance and behavior of the pie chart
   */
  const options: Highcharts.Options = {
    chart: { 
      type: 'pie', 
      backgroundColor: 'transparent',
      height: 'auto',
      style: {
        minHeight: '500px',
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        boxSizing: 'border-box' 
      }
    },
    title: {
      text: '',
      style: { display: 'none' }
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
      pointFormat: '<b>{point.percentage:.1f}%</b><br/>{point.y} products',
      shadow: {
        offsetX: 0,
        offsetY: 2,
        width: 6,
        opacity: 0.1
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'white',
        colors: MODERN_COLORS, 
        innerSize: '45%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br/>{point.percentage:.1f}%',
          distance: 20,   
          style: { 
            color: isDark ? '#f3f4f6' : '#2d3748',
            textOutline: 'none',
            fontSize: '13px',
            fontWeight: '600'
          },
          filter: { 
            property: 'percentage', 
            operator: '>', 
            value: 3
          },
          connectorWidth: 2,
          connectorColor: '#cbd5e0'
        },
        point: {
          events: {
            // Handle slice click to trigger category selection
            click: function() {
              const point = this as Highcharts.Point;
              if (point.name) {
                onCategoryClick(point.name);
              }
            },
            // Ensure tooltip updates on hover for better UX
            mouseOver: function() {
              this.series.chart.tooltip.refresh(this);
            }
          }
        },
        states: {
          hover: {
            brightness: 0.1,
            halo: {
              size: 10,
              opacity: 0.1
            }
          },
          select: {
            color: '#4a5568', 
            borderColor: '#4a5568',
            borderWidth: 2
          }
        },
        showInLegend: false
      },
      series: {
        animation: {
          duration: 800
        },
        cursor: 'pointer',
        point: {
          events: {
            click: function() {
            }
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        name: 'Products',
        data: data,
        size: '100%',
        innerSize: '45%',
        showInLegend: false,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br/>{point.percentage:.1f}%',
          distance: 20,
          style: {
            color: isDark ? '#f3f4f6' : '#2d3748',
            textOutline: 'none',
            fontSize: '13px',
            fontWeight: '600'
          },
          filter: {
            property: 'percentage',
            operator: '>',
            value: 3
          },
          connectorWidth: 2,
          connectorColor: '#cbd5e0'
        }
      }
    ],
    legend: { 
      layout: 'horizontal', 
      align: 'center', 
      verticalAlign: 'bottom',
      itemStyle: {
        color: isDark ? '#e2e8f0' : '#4a5568',
        fontSize: '13px',
        fontWeight: '500'
      },
      itemHoverStyle: {
        color: isDark ? '#ffffff' : '#1a202c'
      },
      itemMarginBottom: 8,
      symbolRadius: 6,
      symbolHeight: 12,
      symbolWidth: 12,
      itemDistance: 20
    },
    credits: {
      enabled: false
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            plotOptions: {
              pie: {
                innerSize: '40%',
                dataLabels: {
                  enabled: true,
                  format: '{point.name}<br/>{point.percentage:.0f}%',
                  distance: 10,
                  style: {
                    fontSize: '11px'
                  }
                }
              }
            },
            legend: {
              itemStyle: {
                fontSize: '11px'
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
      <Suspense fallback={
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          h="100%"
          color="gray.500"
          fontSize="sm"
        >
          Loading chart...
        </Box>
      }>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
          constructorType="chart"
          immutable={true}
          allowChartUpdate={true}
        />
      </Suspense>
    </Box>
  );
}

export default PieChart;