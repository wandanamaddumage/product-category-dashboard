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
  getCategorySalesData,
  getPieChartData,
  productsData,
} from '../../const/productData';
import FilterSection from './components/FilterSection';
import type { RootState } from './store';

// Dynamically import chart components from chart-app
const Dashboard = lazy(() => import('chartApp/Dashboard'));
const BarChart = lazy(() => import('chartApp/BarChart'));
const LineChart = lazy(() => import('chartApp/LineChart'));
const PieChartComponent = lazy(
  () => import('chartApp/PieChart')
) as React.ComponentType<{ data: any }>;

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

  // Prepare data based on filters
  const pieChartData = getPieChartData(
    selectedProducts.length > 0 ? selectedProducts : undefined
  );
  const categorySalesData = getCategorySalesData();

  // Filter products based on selection
  const filteredProductsForCharts =
    selectedProducts.length > 0
      ? productsData.filter((p: { id: number }) =>
          selectedProducts.includes(p.id)
        )
      : selectedCategory
        ? productsData.filter(
            (p: { category: string }) => p.category === selectedCategory
          )
        : productsData;

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Box textAlign="center" py={8}>
            <Heading size="2xl" mb={4}>
              Container Application
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Host app consuming Chart Micro Frontend
            </Text>
            <Text fontSize="sm" color="gray.500" mt={2}>
              Built with Vite + React + Module Federation + Chakra UI
            </Text>
          </Box>

          {/* Filter Section */}
          <Box>
            <Suspense fallback={<ChartLoader />}>
              <FilterSection />
            </Suspense>
          </Box>

          {/* Individual Charts Section */}
          <Box>
            <Heading size="lg" mb={4}>
              Charts Based on Filters
            </Heading>
            <VStack gap={6} align="stretch">
              <Suspense fallback={<ChartLoader />}>
                {/* <BarChart data={filteredProductsForCharts} /> */}
              </Suspense>

              <Suspense fallback={<ChartLoader />}>
                {/* <LineChart data={filteredProductsForCharts} /> */}
              </Suspense>

              <Suspense fallback={<ChartLoader />}>
                {/* <PieChartComponent data={pieChartData} /> */}
              </Suspense>
            </VStack>
          </Box>

          {/* Full Dashboard */}
          {selectedCategory && (
            <Box>
              <Heading size="lg" mb={4}>
                Complete Dashboard - {selectedCategory}
              </Heading>
              <Suspense fallback={<ChartLoader />}>
                {/* <Dashboard
                  category={selectedCategory}
                  products={filteredProductsForCharts}
                /> */}
              </Suspense>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
