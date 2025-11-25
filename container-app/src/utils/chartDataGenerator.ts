/**
 * Chart Data Generator Utility
 * - Generates mock chart data based on filters
 * - Can be replaced with API calls
 */

export interface DataPoint {
  category: string;
  value: number;
}

const mockProductsByCategory: Record<string, number[]> = {
  Electronics: [1, 2, 3, 4],
  Furniture: [5, 6, 7, 8],
  Groceries: [9, 10, 11],
  Beauty: [12, 13, 14],
};

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
  const categoryProducts = mockProductsByCategory[category] || [];

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
