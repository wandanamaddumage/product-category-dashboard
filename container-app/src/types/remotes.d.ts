declare module 'chartApp/PieChart' {
  export interface PieChartProps {
    data: { name: string; y: number; category?: string }[];
    onCategoryClick: (category: string) => void;
    isDark: boolean;
  }

  export default function PieChart(props: PieChartProps): JSX.Element;
}

declare module 'chartApp/BarChart' {
  import { Product } from '../../const/productData';

  export interface BarChartProps {
    data: Product[];
    isDark?: boolean;
  }

  export default function BarChart(props: BarChartProps): JSX.Element;
}
