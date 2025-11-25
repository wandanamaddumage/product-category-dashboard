import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';

interface PieChartProps {
  data: { category: string; value: number }[];
  onCategoryClick: (category: string) => void;
  isDark: boolean;
}

export default function PieChart({
  data,
  onCategoryClick,
  isDark,
}: PieChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Monochrome colors like the example
  const MONO_COLORS = useMemo(() => {
    const baseColor = Highcharts.getOptions().colors?.[0] || '#7cb5ec';
    return Highcharts.getOptions().colors!.map((_, i) =>
      Highcharts.color(baseColor)
        .brighten((i - 3) / 7)
        .get()
    );
  }, []);

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: '100%',
      spacing: [10, 10, 15, 10],
    },
    title: {
      text: 'Product Categories Distribution',
      style: { color: isDark ? '#f3f4f6' : '#1a1a1a', fontSize: '16px' },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      backgroundColor: isDark ? '#374151' : '#fff',
      borderColor: isDark ? '#4b5563' : '#e5e7eb',
      style: { color: isDark ? '#f3f4f6' : '#1a1a1a' },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderRadius: 5,
        borderColor: 'none',
        colors: MONO_COLORS,
        dataLabels: {
          enabled: true,
          format:
            '<span style="font-size: 1.2em"><b>{point.name}</b>' +
            '</span><br>' +
            '<span style="opacity: 0.6">{point.percentage:.1f} ' +
            '%</span>',
          style: {
            color: isDark ? '#f3f4f6' : '#1a1a1a',
            textOutline: 'none',
            fontSize: '12px',
          },
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
        events: {
          click: function (event) {
            onCategoryClick(event.point.name as string);
          },
        },
      },
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: {
        color: isDark ? '#f3f4f6' : '#1a1a1a',
        fontSize: '12px',
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Categories',
        data: data.map(d => ({
          name: d.category,
          y: d.value,
        })),
      },
    ],
    responsive: {
      rules: [
        {
          condition: { maxWidth: 480 },
          chartOptions: {
            chart: { height: 'auto' },
            plotOptions: {
              pie: {
                dataLabels: {
                  distance: -20,
                  style: { fontSize: '10px' },
                },
              },
            },
            legend: {
              layout: 'vertical',
              itemStyle: { fontSize: '10px' },
            },
          },
        },
      ],
    },
  };

  return (
    <Box p={4}>
      <Card variant="elevated" w="100%" h="100%">
        <CardHeader>
          <Heading size="md">Product Categories Distribution</Heading>
          <Text color="gray.600" fontSize="sm">
            Product categories distribution
          </Text>
        </CardHeader>
        <CardBody>
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartRef}
              />
            </ResponsiveContainer>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
