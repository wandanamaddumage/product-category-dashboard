// src/data/productData.ts

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  sales: number;
}

export interface CategoryData {
  name: string;
  products: Product[];
}

export const productsData: Product[] = [
  {
    id: 1,
    title: 'Laptop Pro',
    category: 'Electronics',
    price: 1299,
    sales: 145,
  },
  {
    id: 2,
    title: 'Wireless Headphones',
    category: 'Electronics',
    price: 199,
    sales: 320,
  },
  {
    id: 3,
    title: 'Smartphone X',
    category: 'Electronics',
    price: 899,
    sales: 280,
  },
  {
    id: 4,
    title: 'Tablet Elite',
    category: 'Electronics',
    price: 599,
    sales: 190,
  },
  {
    id: 5,
    title: 'Ergonomic Chair',
    category: 'Furniture',
    price: 349,
    sales: 95,
  },
  {
    id: 6,
    title: 'Wooden Desk',
    category: 'Furniture',
    price: 499,
    sales: 120,
  },
  { id: 7, title: 'Modern Sofa', category: 'Furniture', price: 899, sales: 65 },
  { id: 8, title: 'Glass Table', category: 'Furniture', price: 299, sales: 85 },
  {
    id: 9,
    title: 'Fresh Fruits',
    category: 'Groceries',
    price: 25,
    sales: 450,
  },
  {
    id: 10,
    title: 'Organic Vegetables',
    category: 'Groceries',
    price: 30,
    sales: 380,
  },
  {
    id: 11,
    title: 'Dairy Products',
    category: 'Groceries',
    price: 15,
    sales: 520,
  },
  { id: 12, title: 'Facial Cream', category: 'Beauty', price: 45, sales: 210 },
  { id: 13, title: 'Makeup Set', category: 'Beauty', price: 89, sales: 175 },
  { id: 14, title: 'Hair Care', category: 'Beauty', price: 35, sales: 240 },
];

// Get unique categories
export const categories = Array.from(
  new Set(productsData.map(p => p.category))
);

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter(p => p.category === category);
};

// Get category data for charts
export const getCategoryData = (): CategoryData[] => {
  return categories.map(category => ({
    name: category,
    products: getProductsByCategory(category),
  }));
};

// Get aggregated data for pie chart
export const getPieChartData = (selectedProducts?: number[]) => {
  const products =
    selectedProducts && selectedProducts.length > 0
      ? productsData.filter(p => selectedProducts.includes(p.id))
      : productsData;

  return products.map(p => ({
    name: p.title,
    value: p.sales,
    category: p.category,
  }));
};

// Get aggregated data by category
export const getCategorySalesData = () => {
  return categories.map(category => {
    const categoryProducts = getProductsByCategory(category);
    const totalSales = categoryProducts.reduce((sum, p) => sum + p.sales, 0);
    return {
      category,
      sales: totalSales,
    };
  });
};
