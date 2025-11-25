import {
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import {
  getPieChartData,
  getProductsByCategory,
  productsData,
  type Product,
} from '../../const/productData';
import FilterSection from './components/FilterSection';
import type { RootState } from './store';

// Type definitions for chart components
type BarChartProps = {
  data: Product[];
};

type PieDataPoint = {
  name: string;
  value: number;
  category: string;
};

type PieChartProps = {
  data: PieDataPoint[];
  onCategoryClick: (category: string) => void;
  isDark: boolean;
};

const BarChart = lazy(
  () =>
    import('chartApp/BarChart') as Promise<{
      default: React.ComponentType<BarChartProps>;
    }>
);

const PieChart = lazy(
  () =>
    import('chartApp/PieChart') as Promise<{
      default: React.ComponentType<PieChartProps>;
    }>
);

const ChartLoader = () => (
  <Card>
    <CardBody>
      <Center p={8}>
        <VStack gap={4}>
          <Spinner size="xl" colorScheme="blue" />
          <Text color="gray.600">Loading chart component...</Text>
        </VStack>
      </Center>
    </CardBody>
  </Card>
);

function App() {
  // Get filter state from Redux
  const { selectedCategory, selectedProducts } = useSelector(
    (state: RootState) => state.filter
  );

  // Get report state
  const { hasRun } = useSelector((state: RootState) => state.report);

  // Prepare data based on filters
  const pieChartData: PieDataPoint[] = getPieChartData(
    selectedProducts.length > 0 ? selectedProducts : undefined
  );

  // Get filtered products based on selection
  const getFilteredProducts = (): Product[] => {
    if (selectedProducts.length > 0) {
      return productsData.filter((p: Product) =>
        selectedProducts.includes(p.id)
      );
    }
    if (selectedCategory) {
      return getProductsByCategory(selectedCategory);
    }
    return productsData;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Box textAlign="center" py={4}>
            <Heading size="2xl" mb={4} color="blue.600">
              Product Category Dashboard
            </Heading>
            <Text fontSize="lg" color="gray.600">
              View and analyze product category data
            </Text>
          </Box>

          {/* Filter Section */}
          <Box>
            <Suspense fallback={<ChartLoader />}>
              <FilterSection />
            </Suspense>
          </Box>

          {/* Charts Section */}
          <VStack gap={8} align="stretch">
            {/* Pie Chart - Always visible */}
            <Box>
              <Heading size="md" mb={4} color="gray.700">
                Product Categories
              </Heading>
              <Suspense fallback={<ChartLoader />}>
                <PieChart
                  data={pieChartData}
                  onCategoryClick={(category: string) => {
                    console.log('Selected category:', category);
                  }}
                  isDark={false}
                />
              </Suspense>
            </Box>

            {/* Column Chart - Only shown after Run Report is clicked */}
            {hasRun && (
              <Box>
                <Heading size="md" mb={4} color="gray.700">
                  Sales by Category
                </Heading>
                <Suspense fallback={<ChartLoader />}>
                  <BarChart data={filteredProducts} />
                </Suspense>
              </Box>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
