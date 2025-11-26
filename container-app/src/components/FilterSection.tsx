import { Card, CardBody, VStack, Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { setSelectedCategory, setSelectedProducts } from '../store/slices/filterSlice';
import { setFiltersChanged, submitReport } from '../store/slices/reportSlice';
import { categories, getProductsByCategory, productsData } from '../../../const/productData';
import GenericDropdown from './shared/Dropdown';
import GenericCheckboxList from './shared/Checkbox';

function FilterSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCategory, selectedProducts } = useSelector((state: RootState) => state.filter);
  const { filtersChanged } = useSelector((state: RootState) => state.report);

  const availableProducts = selectedCategory ? getProductsByCategory(selectedCategory) : productsData;

  const markFiltersChanged = () => dispatch(setFiltersChanged(true));

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
    dispatch(setSelectedProducts([]));
    markFiltersChanged();
  };

  const handleProductSelection = (productIds: string[]) => {
    dispatch(setSelectedProducts(productIds.map(Number)));
    markFiltersChanged();
  };

  const handleRunReport = () => dispatch(submitReport(selectedProducts.map(String)));

  const handleClearFilters = (clearCategory = true, clearProducts = true) => {
    if (clearCategory) dispatch(setSelectedCategory(null));
    if (clearProducts) dispatch(setSelectedProducts([]));
    markFiltersChanged();
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
      minH="600px"
      maxH="calc(100vh - 40px)"
      overflowY="auto"
      sx={{
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-track': { bg: 'gray.50' },
        '&::-webkit-scrollbar-thumb': { bg: 'gray.300', borderRadius: 'full' },
        '&::-webkit-scrollbar-thumb:hover': { bg: 'gray.400' },
      }}
    >
      <CardBody p={{ base: 4, md: 5, lg: 6 }}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <VStack align="stretch" spacing={1}>
            <Text fontWeight="700" fontSize="lg" color="gray.800">
              Filters
            </Text>
            <Text fontSize="xs" color="gray.500">
              Select category and products
            </Text>
          </VStack>

          <GenericDropdown
            label="Category"
            options={categories.map((c) => ({ value: c }))}
            selectedValue={selectedCategory}
            onChange={handleCategoryChange}
            onClear={() => handleClearFilters(true, false)}
          />

          <GenericCheckboxList
            label="Products"
            options={availableProducts.map((p) => ({ id: p.id, label: p.title }))}
            selectedValues={selectedProducts}
            onChange={handleProductSelection}
            onClear={() => handleClearFilters(false, true)}
            disabled={!selectedCategory}
          />

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
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Run Report
            </Button>
            <Button
              variant="outline"
              size="md"
              width="100%"
              onClick={() => handleClearFilters()}
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
