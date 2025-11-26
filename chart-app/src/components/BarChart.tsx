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
import type { Product } from '../../../const/productData';

type BarChartProps = {
  data: Product[]; // host passes filteredProducts
  isDark?: boolean;
};

function BarChart({ data, isDark = false }: BarChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const categorySales = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach(p =>
      map.set(p.category, (map.get(p.category) || 0) + p.sales)
    );
    return Array.from(map.entries()).map(([name, y]) => ({ name, y }));
  }, [data]);

  const sortedData = [...categorySales].sort((a, b) => b.y - a.y);

  const options: Highcharts.Options = {
    chart: { type: 'column', backgroundColor: 'transparent', height: '100%' },
    title: {
      text: 'Sales by Category',
      align: 'left',
      style: { color: isDark ? '#f3f4f6' : '#2D3748' },
    },
    xAxis: { type: 'category' },
    yAxis: { title: { text: 'Sales (units)' } },
    series: [{ type: 'column', name: 'Sales', data: sortedData }],
    plotOptions: {
      column: {
        borderRadius: 6,
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          style: { textOutline: 'none' },
        },
      },
    },
    credits: { enabled: false },
  };

  return (
    <Card variant="elevated">
      <CardHeader pb={2}>
        <Heading size="md">Sales by Category</Heading>
        <Text color="gray.600" fontSize="sm" mt={1}>
          Total sales per product category
        </Text>
      </CardHeader>
      <CardBody pt={0}>
        <Box h="400px">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
            containerProps={{ style: { height: '100%', width: '100%' } }}
          />
        </Box>
      </CardBody>
    </Card>
  );
}

export default BarChart;
