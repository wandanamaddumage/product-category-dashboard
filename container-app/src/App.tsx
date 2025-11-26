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
import { setFiltersChanged } from './store/slices/reportSlice';

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
  <Card
    bg="white"
    shadow="sm"
    borderRadius="xl"
    border="1px"
    borderColor="gray.100"
  >
    <CardBody>
      <Center p={{ base: 6, md: 10 }}>
        <VStack spacing={4}>
          <Spinner 
            size="xl" 
            thickness="4px"
            speed="0.65s"
            color="blue.500"
          />
          <Text color="gray.500" fontSize="sm">Loading chart...</Text>
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
  
  // Get pie chart data based on filters
  // If products are selected, show only those products
  // If only category is selected, show all products in that category
  // If nothing is selected, show all products by category
  const pieChartData = getPieChartData(
    selectedProducts.length > 0 ? selectedProducts : undefined
  );

  // Handle pie chart category click
  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedCategory(category));
    dispatch(setFiltersChanged(true));
  };

  return (
    <Box 
      minH="100vh" 
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'white',
        opacity: 0.95,
      }}
    >
      <Box position="relative" zIndex={1}>
        <Container 
          maxW="1400px" 
          py={{ base: 6, md: 8, lg: 12 }}
          px={{ base: 4, md: 6, lg: 8 }}
        >
          {/* Header */}
          <Box 
            textAlign="center" 
            mb={{ base: 6, md: 8, lg: 10 }}
          >
            <Heading 
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="800"
              bgGradient="linear(to-r, blue.600, purple.600)"
              bgClip="text"
              mb={3}
              letterSpacing="tight"
            >
              Product Dashboard
            </Heading>
            <Text 
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} 
              color="gray.600"
              fontWeight="500"
            >
              Analyze products and categories with interactive charts
            </Text>
          </Box>

          {/* Main Content Grid */}
          <SimpleGrid
            columns={{ base: 1, lg: 12 }}
            spacing={{ base: 4, md: 6, lg: 8 }}
            alignItems="start"
          >
            {/* Left Side - Filters */}
            <Box gridColumn={{ base: 'span 1', lg: 'span 3' }}>
              <Suspense fallback={<ChartLoader />}>
                <FilterSection />
              </Suspense>
            </Box>

            {/* Right Side - Charts */}
            <Box gridColumn={{ base: 'span 1', lg: 'span 9' }}>
              <VStack spacing={{ base: 4, md: 6, lg: 8 }} align="stretch">
                {/* Pie Chart Card */}
                <Card
                  bg="white"
                  shadow="lg"
                  borderRadius="2xl"
                  border="1px"
                  borderColor="gray.100"
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
                >
                  <CardBody p={{ base: 5, md: 6, lg: 8 }}>
                    <Flex 
                      justify="space-between" 
                      align="center" 
                      mb={{ base: 4, md: 6 }}
                    >
                      <Box>
                        <Heading 
                          size={{ base: 'md', md: 'lg' }}
                          color="gray.800"
                          fontWeight="700"
                          mb={1}
                        >
                          Product Categories
                        </Heading>
                        <Text fontSize="sm" color="gray.500">
                          Click on a category to filter
                        </Text>
                      </Box>
                    </Flex>
                    <Box
                      minH={{ base: '300px', md: '350px', lg: '400px' }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
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

                {/* Bar Chart Card - Only visible after Run Report */}
                {hasRun && (
                  <Card
                    bg="white"
                    shadow="lg"
                    borderRadius="2xl"
                    border="1px"
                    borderColor="gray.100"
                    overflow="hidden"
                    transition="all 0.3s"
                    _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
                  >
                    <CardBody p={{ base: 5, md: 6, lg: 8 }}>
                      <Flex 
                        justify="space-between" 
                        align="center" 
                        mb={{ base: 4, md: 6 }}
                      >
                        <Box>
                          <Heading 
                            size={{ base: 'md', md: 'lg' }}
                            color="gray.800"
                            fontWeight="700"
                            mb={1}
                          >
                            Product Analysis
                          </Heading>
                          <Text fontSize="sm" color="gray.500">
                            {filteredProducts.length} products displayed
                          </Text>
                        </Box>
                      </Flex>
                      <Box
                        minH={{ base: '300px', md: '350px', lg: '400px' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
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
    </Box>
  );
}

export default App;