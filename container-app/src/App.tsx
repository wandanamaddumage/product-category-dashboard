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
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import { lazy, Suspense, useEffect, useRef } from 'react';
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
import { resetReport } from './store/slices/reportSlice';
import { DashboardHeader } from './components/DashboardHeader';

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

const PieChart = lazy(() =>
  import('chartApp/PieChart').then(mod => ({
    default: normalizeRemote<RemotePieChartProps>(mod),
  }))
);

const BarChart = lazy(() =>
  import('chartApp/BarChart').then(mod => ({
    default: normalizeRemote<RemoteBarChartProps>(mod),
  }))
);

// Loading Spinner
const ChartLoader = () => (
  <Card bg="white" shadow="sm" borderRadius="xl" border="1px" borderColor="gray.100">
    <CardBody>
      <Center p={{ base: 4, md: 6 }}>
        <VStack spacing={4}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color="purple.500" />
          <Text color="gray.500" fontSize="sm">Loading chart...</Text>
        </VStack>
      </Center>
    </CardBody>
  </Card>
);

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedCategory, selectedProducts } = useSelector(
    (state: RootState) => state.filter
  );
  const { hasRun } = useSelector((state: RootState) => state.report);

  const isInitialMount = useRef(true);

  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedCategory(category));
    dispatch(resetReport());
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (hasRun) {
      dispatch(resetReport());
    }
  }, [selectedCategory, selectedProducts]);

  // Product filtering function
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

  return (
    <Box bg="gray.50" minH="100vh" p={4}>
      <Container maxW="1300px" py={{ base: 4, md: 8 }}>

        <DashboardHeader />

        <SimpleGrid
          columns={{ base: 1, lg: 12 }}
          spacing={{ base: 4, md: 6 }}
          alignItems="start"

        >
          {/* Filters — Left */}
          <Box gridColumn={{ base: 'span 1', lg: 'span 4' }} h="auto" style={{ height: 'auto' }}>
            <FilterSection />
          </Box>

          {/* Charts — Right */}
          <Box gridColumn={{ base: 'span 1', lg: 'span 8' }}>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              
              {/* Pie Chart */}
              <Card borderRadius="xl" shadow="md">
                <CardBody p={{ base: 4, md: 6 }}>
                  <Flex justify="space-between" mb={4}>
                    <Box>
                      <Heading size="md" color="gray.800">Products Categories</Heading>
                      <Text fontSize="sm" color="gray.500">Click a category to filter products</Text>
                    </Box>
                  </Flex>

                  <Box minH="320px" display="flex" justifyContent="center">
                    <Suspense fallback={<ChartLoader />}>
                      <PieChart
                        data={pieChartData}
                        onCategoryClick={handleCategoryClick}
                        isDark={false}
                      />
                    </Suspense>
                  </Box>
                </CardBody>
              </Card>

              {/* Bar Chart — Shown after Run Report */}
              {hasRun && (
                <Card borderRadius="xl" shadow="md">
                  <CardBody p={{ base: 4, md: 6 }}>
                    <Flex justify="space-between" mb={3}>
                      <Box>
                        <Heading size="md" color="gray.800">Products Analysis</Heading>
                        <Text fontSize="sm" color="gray.500">
                          {filteredProducts.length} products shown in {selectedCategory ? selectedCategory : 'all categories'}
                        </Text>
                      </Box>
                    </Flex>

                    <Box minH="320px" display="flex" justifyContent="center">
                      <Suspense fallback={<ChartLoader />}>
                        <BarChart data={filteredProducts} />
                      </Suspense>
                    </Box>
                  </CardBody>
                </Card>
              )}

            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default App;