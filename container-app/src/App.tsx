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
import { useDispatch, useSelector } from 'react-redux';
import {
  getPieChartData,
  getProductsByCategory,
  productsData,
  type Product,
} from '../../const/productData';
import FilterSection from './components/FilterSection';
import type { AppDispatch, RootState } from './store';
import { setSelectedCategory } from './store/slices/filterSlice';

const normalizeRemote = <T,>(mod: any) => {
  let comp = mod?.default ?? mod;
  if (comp?.default) comp = comp.default;
  return comp as React.ComponentType<T>;
};

type RemotePieChartProps = {
  data: { name: string; y: number; category?: string }[];
  onCategoryClick: (category: string) => void;
  isDark: boolean;
};

type RemoteBarChartProps = {
  data: Product[];
  isDark?: boolean;
};

// Lazy load remote components
const PieChart = lazy(() =>
  import('chartApp/PieChart').then(mod => {
    return { default: normalizeRemote<RemotePieChartProps>(mod) };
  })
);
const BarChart = lazy(() =>
  import('chartApp/BarChart').then(mod => {
    return { default: normalizeRemote<RemoteBarChartProps>(mod) };
  })
);

// Loading component
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
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { selectedCategory, selectedProducts } = useSelector(
    (state: RootState) => state.filter
  );
  const { hasRun } = useSelector((state: RootState) => state.report);

  // Get filtered products based on selection
  const getFilteredProducts = () => {
    if (selectedProducts.length > 0) {
      return productsData.filter(p => selectedProducts.includes(p.id));
    }
    if (selectedCategory) {
      return getProductsByCategory(selectedCategory);
    }
    return productsData;
  };

  const filteredProducts = getFilteredProducts();
  const pieChartData = getPieChartData(
    selectedProducts.length > 0 ? selectedProducts : undefined
  );

  // Handle pie chart category click
  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

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
          <Suspense fallback={<ChartLoader />}>
            <FilterSection />
          </Suspense>

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
                  onCategoryClick={handleCategoryClick}
                  isDark={false}
                />
              </Suspense>
            </Box>

            {/* Bar Chart - Only visible after Run Report */}
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
