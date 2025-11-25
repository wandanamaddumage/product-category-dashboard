'use client';

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  Heading,
  HStack,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';

interface SelectItem {
  label: string;
  value: string;
}

import {
  clearCategory,
  clearFilters,
  clearProducts,
  setSelectedCategory,
  setSelectedProducts,
} from '../store/slices/filterSlice';

import { setRunReportLoading } from '../store/slices/reportSlice';

// Import the data
import { categories, productsData } from '../../../const/productData';

interface FilteredProduct {
  id: number;
  title: string;
  category: string;
}

export default function FilterSection() {
  const dispatch = useDispatch();
  const { selectedCategory, selectedProducts } = useSelector(
    (state: RootState) => state.filter
  );
  const { isLoading } = useSelector((state: RootState) => state.report);

  // Use imported data instead of hardcoded
  const allProducts: FilteredProduct[] = productsData;

  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? allProducts.filter(p => p.category === selectedCategory)
      : [];
  }, [selectedCategory]);

  // Disable run report button until filters exist
  const isRunReportDisabled =
    !selectedCategory && selectedProducts.length === 0;

  const handleRunReport = () => {
    if (!isRunReportDisabled) {
      dispatch(setRunReportLoading(true));
      setTimeout(() => {
        dispatch(setRunReportLoading(false));
      }, 500);
    }
  };

  // Prepare category options
  const categoryOptions = categories.map((c: string) => ({
    label: c,
    value: c,
  }));

  // Prepare product options
  const productOptions = filteredProducts.map(p => ({
    label: p.title,
    value: String(p.id),
  }));

  return (
    <Card variant="elevated">
      <CardHeader>
        <Heading size="md">Filter Products</Heading>
      </CardHeader>
      <CardBody>
        <VStack gap={6} align="stretch">
          {/* -------------------- CATEGORY SELECT -------------------- */}
          <Box>
            <Text fontWeight="600" mb={2} color="gray.700" fontSize="sm">
              Product Category{' '}
              <Text as="span" color="red.500">
                *
              </Text>
            </Text>

            <FormControl id="category-select">
              <Select
                placeholder="Select category"
                value={selectedCategory || ''}
                onChange={e => {
                  const value = e.target.value;
                  dispatch(setSelectedCategory(value));
                  dispatch(setSelectedProducts([]));
                }}
                size="sm"
                width="100%"
              >
                {categoryOptions.map((item: SelectItem) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            {selectedCategory && (
              <Flex mt={2} gap={2} alignItems="center">
                <Badge colorScheme="blue" variant="solid">
                  {selectedCategory}
                </Badge>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => dispatch(clearCategory())}
                >
                  Clear
                </Button>
              </Flex>
            )}
          </Box>

          {/* -------------------- PRODUCTS MULTI SELECT -------------------- */}
          <Box>
            <Text fontWeight="600" mb={2} color="gray.700" fontSize="sm">
              Products{' '}
              {!selectedCategory && (
                <Text as="span" fontSize="xs" color="gray.500" ml={2}>
                  (Select category first)
                </Text>
              )}
            </Text>

            <FormControl id="product-select" isDisabled={!selectedCategory}>
              <Select
                placeholder="Select products"
                multiple
                value={selectedProducts.map(String)}
                onChange={e => {
                  const options = Array.from(e.target.selectedOptions, option =>
                    Number(option.value)
                  );
                  dispatch(setSelectedProducts(options));
                }}
                size="sm"
                width="100%"
                height="auto"
                minH="100px"
              >
                {productOptions.map(item => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            {selectedProducts.length > 0 && (
              <Flex mt={2} gap={1} wrap="wrap" alignItems="center">
                {selectedProducts.map(id => {
                  const product = filteredProducts.find(p => p.id === id);
                  return (
                    <Badge key={id} colorScheme="teal" variant="solid">
                      {product?.title}
                    </Badge>
                  );
                })}

                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => dispatch(clearProducts())}
                >
                  Clear Products
                </Button>
              </Flex>
            )}
          </Box>

          {/* -------------------- ACTION BUTTONS -------------------- */}
          <HStack gap={4} pt={4} borderTopWidth="1px">
            <Button
              colorScheme="blue"
              size="md"
              fontWeight="600"
              isDisabled={isRunReportDisabled}
              isLoading={isLoading}
              loadingText="Generating..."
              onClick={handleRunReport}
            >
              Run Report
            </Button>

            <Button
              variant="outline"
              colorScheme="gray"
              onClick={() => dispatch(clearFilters())}
              size="md"
            >
              Clear All Filters
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
