import { Box } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReactImport from 'highcharts-react-official';
import type HighchartsReactComponent from 'highcharts-react-official';
import { Suspense, useMemo, useRef } from 'react';

// Normalize the shared module so React receives an actual component function,
// even if the federation runtime hands us a nested module/object shape.
const resolveHighchartsReact = (mod: any) => {
  if (typeof mod === 'function') return mod;
  if (mod?.HighchartsReact) return mod.HighchartsReact;
  if (mod?.default) return resolveHighchartsReact(mod.default);
  return mod;
};
const HighchartsReact = resolveHighchartsReact(HighchartsReactImport);

type PiePoint = { name: string; y: number; category?: string };

type PieChartProps = {
  data: PiePoint[];
  onCategoryClick: (category: string) => void;
  isDark: boolean;
};

function PieChart({ data, onCategoryClick, isDark }: PieChartProps) {
  const chartRef = useRef<HighchartsReactComponent.RefObject>(null);

  // Generate color palette based on base color #6b46c1
  const MODERN_COLORS = useMemo(() => {
    const baseColor = '#845ddeff';
    const colors: string[] = [];

    // Generate 8 variations of the base color
    for (let i = 0; i < 8; i++) {
      const brightness = (i - 3) / 7; // Range from -0.43 to 0.71
      const color = Highcharts.color(baseColor)
        .brighten(brightness)
        .get() as string;
      colors.push(color);
    }

    return colors;
  }, []);

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 'auto',
      style: {
        minHeight: '500px',
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        boxSizing: 'border-box',
      },
    },
    title: {
      text: '',
      style: { display: 'none' },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      padding: 12,
      style: {
        fontSize: '13px',
        fontWeight: '500',
      },
      pointFormat: '<b>{point.percentage:.1f}%</b><br/>{point.y} products',
      shadow: {
        offsetX: 0,
        offsetY: 2,
        width: 6,
        opacity: 0.1,
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'white',
        colors: MODERN_COLORS,
        innerSize: '45%', // Creates a donut chart
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br/>{point.percentage:.1f}%',
          distance: 20,
          style: {
            color: isDark ? '#f3f4f6' : '#2d3748',
            textOutline: 'none',
            fontSize: '13px',
            fontWeight: '600',
          },
          filter: {
            property: 'percentage',
            operator: '>',
            value: 3,
          },
          connectorWidth: 2,
          connectorColor: '#cbd5e0',
        },
        point: {
          events: {
            click: function () {
              onCategoryClick((this as any).name);
            },
          },
        },
        states: {
          hover: {
            brightness: 0.15,
            halo: {
              size: 12,
              opacity: 0.25,
            },
          },
          select: {
            color: undefined,
            borderColor: '#6b46c1',
            borderWidth: 3,
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Products',
        data: data.map(item => ({
          name: item.name,
          y: item.y,
          category: item.category,
        })),
      },
    ],
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: {
        color: isDark ? '#e2e8f0' : '#4a5568',
        fontSize: '13px',
        fontWeight: '500',
      },
      itemHoverStyle: {
        color: isDark ? '#ffffff' : '#1a202c',
      },
      itemMarginBottom: 8,
      symbolRadius: 6,
      symbolHeight: 12,
      symbolWidth: 12,
      itemDistance: 20,
    },
    credits: { enabled: false },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
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
                    fontSize: '11px',
                  },
                },
              },
            },
            legend: {
              itemStyle: {
                fontSize: '11px',
              },
            },
          },
        },
      ],
    },
  };

  return (
    <Box
      w="100%"
      h="100%"
      minH={{ base: '300px', md: '350px', lg: '400px' }}
      position="relative"
    >
      <Suspense
        fallback={
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
        }
      >
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
