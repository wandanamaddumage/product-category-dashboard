import { Card, CardBody } from '@chakra-ui/react';
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

  const MONO_COLORS = useMemo(() => {
    const base = Highcharts.getOptions().colors?.[0] || '#7cb5ec';
    const arr = Highcharts.getOptions().colors || [
      '#7cb5ec',
      '#434348',
      '#90ed7d',
      '#f7a35c',
    ];
    return arr.map((_, i) =>
      Highcharts.color(base)
        .brighten((i - 3) / 7)
        .get()
    );
  }, []);

  const options: Highcharts.Options = {
    chart: { type: 'pie', backgroundColor: 'transparent', height: '100%' },
    title: {
      text: 'Product Categories Distribution',
      style: { color: isDark ? '#f3f4f6' : '#1a1a1a' },
    },
    tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderRadius: 6,
        colors: MONO_COLORS,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: { color: isDark ? '#f3f4f6' : '#1a1a1a', textOutline: 'none' },
          filter: { property: 'percentage', operator: '>', value: 4 },
        },
        point: {
          events: {
            click: function () {
              onCategoryClick((this as any).name);
            },
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Categories',
        data,
      },
    ],
    legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' },
    credits: { enabled: false },
  };

  return (
    <Card variant="outline">
      <CardBody>
        <Suspense fallback={<div>Loading chart...</div>}>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
            constructorType="chart"
            immutable={true}
            allowChartUpdate={true}
          />
        </Suspense>
      </CardBody>
    </Card>
  );
}

export default PieChart;
