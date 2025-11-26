/**
 * Chart Data Generator Utility
 * - Generates mock chart data based on filters
 * - Can be replaced with API calls
 */

export interface DataPoint {
  category: string;
  value: number;
}

/**
 * Generate pie chart data (category distribution)
 */
export function generatePieChartData(): DataPoint[] {
  return [
    { category: 'Electronics', value: 30 },
    { category: 'Furniture', value: 25 },
    { category: 'Groceries', value: 25 },
    { category: 'Beauty', value: 20 },
  ];
}

/**
 * Generate column chart data (product sales)
 */
export function generateColumnChartData(
  category: string,
  products: number[]
): DataPoint[] {
  if (products.length === 0) {
    // Show aggregated data for category
    return [
      {
        category: `${category} (Total)`,
        value: Math.floor(Math.random() * 1000),
      },
    ];
  }

  // Show data for selected products
  return products.map(productId => ({
    category: `Product ${productId}`,
    value: Math.floor(Math.random() * 500) + 100,
  }));
}
