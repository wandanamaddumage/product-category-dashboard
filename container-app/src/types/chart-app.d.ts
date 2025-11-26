import { ComponentType } from 'react';
import { Product } from '../../const/productData';

declare module 'chartApp/BarChart' {
  interface BarChartProps {
    data: Product[];
  }

  const BarChart: ComponentType<BarChartProps>;
  export default BarChart;
}

declare module 'chartApp/PieChart' {
  interface PieChartProps {
    data: Array<{ name: string; value: number; category: string }>;
    onCategoryClick: (category: string) => void;
    isDark: boolean;
  }

  const PieChart: ComponentType<PieChartProps>;
  export default PieChart;
}
