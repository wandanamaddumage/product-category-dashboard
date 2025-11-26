import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Heading,
  Select,
  Stack,
  Text,
  VStack,
  Badge,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  categories,
  getProductsByCategory,
  productsData,
} from '../../../const/productData';
import type { AppDispatch, RootState } from '../store';
import {
  setSelectedCategory,
  setSelectedProducts,
} from '../store/slices/filterSlice';
import { setFiltersChanged, submitReport } from '../store/slices/reportSlice';

function FilterSection() {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedCategory, selectedProducts } = useSelector(
    (state: RootState) => state.filter
  );
  const { filtersChanged } = useSelector((state: RootState) => state.report);

  // Get products based on selected category
  const availableProducts = selectedCategory
    ? getProductsByCategory(selectedCategory)
    : productsData;

const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const category = event.target.value;
  dispatch(setSelectedCategory(category));
  dispatch(setSelectedProducts([])); 
  dispatch(setFiltersChanged(true));
};

  const handleProductSelection = (productIds: string[]) => {
    // Convert string IDs to numbers before dispatching
    const numericIds = productIds.map(id => Number(id));
    dispatch(setSelectedProducts(numericIds));
    dispatch(setFiltersChanged(true));
  };

  const handleRunReport = () => {
    // Convert number IDs to strings before submitting the report
    const productIdsAsStrings = selectedProducts.map(id => id.toString());
    dispatch(submitReport(productIdsAsStrings));
  };

  const handleClearCategory = () => {
    dispatch(setSelectedCategory(null));
    dispatch(setSelectedProducts([]));
    dispatch(setFiltersChanged(true));
  };

  const handleClearProducts = () => {
    dispatch(setSelectedProducts([]));
    dispatch(setFiltersChanged(true));
  };

  const handleClearFilters = () => {
    dispatch(setSelectedCategory(null));
    dispatch(setSelectedProducts([]));
    dispatch(setFiltersChanged(true));
  };

  return (
    <Card
      bg="white"
      shadow="lg"
      borderRadius="2xl"
      border="1px"
      borderColor="gray.100"
      position="sticky"
      top="20px"
    >
      <CardBody p={{ base: 4, md: 5, lg: 6 }}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Box>
            <Heading
              size="md"
              color="gray.800"
              fontWeight="700"
              mb={1}
            >
              Filters
            </Heading>
            <Text fontSize="xs" color="gray.500">
              Select category and products
            </Text>
          </Box>

          {/* Category Filter */}
          <Box>
            <HStack justify="space-between" mb={3}>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="gray.700"
              >
                Category
              </Text>
              {selectedCategory && (
                <IconButton
                  aria-label="Clear category"
                  icon={<CloseIcon />}
                  size="xs"
                  colorScheme="red"
                  variant="ghost"
                  onClick={handleClearCategory}
                />
              )}
            </HStack>
            <Select
              placeholder="Select a category"
              value={selectedCategory || ''}
              onChange={handleCategoryChange}
              borderColor="gray.300"
              _hover={{ borderColor: 'purple.400' }}
              _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805ad5' }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Box>

          {/* Product Selection */}
          <Box>
            <HStack justify="space-between" mb={3}>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="gray.700"
              >
                Products
                {selectedProducts.length > 0 && (
                  <Badge ml={2} colorScheme="purple" fontSize="xs">
                    {selectedProducts.length} selected
                  </Badge>
                )}
              </Text>
              {selectedProducts.length > 0 && (
                <IconButton
                  aria-label="Clear products"
                  icon={<CloseIcon />}
                  size="xs"
                  colorScheme="red"
                  variant="ghost"
                  onClick={handleClearProducts}
                />
              )}
            </HStack>
            {!selectedCategory ? (
              <Box
                p={4}
                bg="gray.50"
                borderRadius="md"
                border="1px dashed"
                borderColor="gray.300"
                textAlign="center"
              >
                <Text fontSize="sm" color="gray.500">
                  Please select a category first
                </Text>
              </Box>
            ) : (
              <CheckboxGroup
                value={selectedProducts.map(id => id.toString())}
                onChange={(values) => handleProductSelection(values as string[])}
              >
                <Stack spacing={2} maxH="300px" overflowY="auto">
                  {availableProducts.map((product) => (
                    <Checkbox
                      key={product.id}
                      value={product.id.toString()}
                      colorScheme="purple"
                    >
                      <Text fontSize="sm">{product.title}</Text>
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            )}
          </Box>

          {/* Action Buttons */}
          <VStack spacing={2}>
            <Button
              colorScheme="purple"
              size="md"
              width="100%"
              onClick={handleRunReport}
              isDisabled={selectedProducts.length === 0}
              fontWeight="600"
              boxShadow={filtersChanged ? 'md' : 'sm'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Run Report
            </Button>
            <Button
              variant="outline"
              size="md"
              width="100%"
              onClick={handleClearFilters}
              colorScheme="gray"
              fontWeight="600"
            >
              Clear Filters
            </Button>
          </VStack>

          {/* Helper Text */}
          {selectedProducts.length === 0 && (
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Select products to enable the report
            </Text>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}

export default FilterSection;