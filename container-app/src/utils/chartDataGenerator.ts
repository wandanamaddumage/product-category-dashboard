export interface DataPoint {
  category: string;
  value: number;
}

export function generatePieChartData(): DataPoint[] {
  return [
    { category: 'Electronics', value: 30 },
    { category: 'Furniture', value: 25 },
    { category: 'Groceries', value: 25 },
    { category: 'Beauty', value: 20 },
  ];
}

export function generateColumnChartData(
  category: string,
  products: number[]
): DataPoint[] {
  if (products.length === 0) {
    return [
      {
        category: `${category} (Total)`,
        value: Math.floor(Math.random() * 1000),
      },
    ];
  }

  return products.map(productId => ({
    category: `Product ${productId}`,
    value: Math.floor(Math.random() * 500) + 100,
  }));
}
