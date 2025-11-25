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

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  sales: number;
}

interface BarChartProps {
  data: Product[];
}

export default function BarChart({ data }: BarChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Process data to get sales by category
  const categorySales = useMemo(() => {
    return data.reduce<{ name: string; y: number }[]>((acc, product) => {
      const existingCategory = acc.find(item => item.name === product.category);
      if (existingCategory) {
        existingCategory.y += product.sales;
      } else {
        acc.push({
          name: product.category,
          y: product.sales,
        });
      }
      return acc;
    }, []);
  }, [data]);

  // Sort categories by sales in descending order
  const sortedData = [...categorySales].sort((a, b) => b.y - a.y);

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: '100%',
    },
    title: {
      text: 'Sales by Category',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#2D3748',
      },
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Category',
      },
      labels: {
        style: {
          color: '#4A5568',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Sales (units)',
      },
      labels: {
        style: {
          color: '#4A5568',
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      headerFormat: '<b>{point.key}</b><br/>',
      pointFormat: 'Sales: <b>{point.y} units</b>',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E2E8F0',
      borderRadius: 6,
      borderWidth: 1,
      shadow: true,
      style: {
        color: '#2D3748',
      },
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        color: '#3182CE',
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          style: {
            color: '#2D3748',
            textOutline: 'none',
          },
        },
      },
    },
    series: [
      {
        name: 'Sales',
        data: sortedData,
        type: 'column',
      },
    ],
    credits: {
      enabled: false,
    },
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
