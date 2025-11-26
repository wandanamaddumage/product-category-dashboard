// src/components/FilterSection.tsx
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Select,
  Tag,
  TagLabel,
  Text,
  VStack,
  Card,
  CardBody,
  Heading,
  Divider,
  Flex,
  Badge,
  Checkbox,
  CheckboxGroup,
  Stack,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  categories,
  getProductsByCategory,
  type Product,
  productsData,
} from '../../../const/productData';
import { AppDispatch, RootState } from '../store';
import {
  clearFilters,
  setSelectedCategory,
  setSelectedProducts,
} from '../store/slices/filterSlice';
import { runReport, setFiltersChanged } from '../store/slices/reportSlice';

export default function FilterSection() {
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux state
  const { selectedCategory, selectedProducts } = useSelector(
    (s: RootState) => s.filter
  );
  const { hasRun, filtersChanged } = useSelector((s: RootState) => s.report);

  // Get products for selected category
  const productOptions = useMemo<Product[]>(
    () => (selectedCategory ? getProductsByCategory(selectedCategory) : []),
    [selectedCategory]
  );

  // Check if filters are empty
  const areFiltersEmpty = !selectedCategory && selectedProducts.length === 0;

  // Run Report button should be disabled when:
  // 1. Both filters are empty, OR
  // 2. Report has been run AND filters haven't changed since
  const runDisabled = areFiltersEmpty || (hasRun && !filtersChanged);

  const hasActiveFilters = selectedCategory || selectedProducts.length > 0;

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value || null;
    dispatch(setSelectedCategory(cat));
    // Products are cleared automatically by the reducer
    dispatch(setFiltersChanged(true));
  };

  // Handle products change (checkbox group returns string array)
  const handleProductsChange = (values: string[]) => {
    const selected = values.map(v => Number(v));
    dispatch(setSelectedProducts(selected));
    dispatch(setFiltersChanged(true));
  };

  // Handle Run Report
  const handleRun = () => {
    dispatch(runReport());
  };

  // Handle Clear All
  const handleClearAll = () => {
    dispatch(clearFilters());
    dispatch(setFiltersChanged(true));
  };

  // Handle clear individual category
  const handleClearCategory = () => {
    dispatch(setSelectedCategory(null));
    dispatch(setFiltersChanged(true));
  };

  // Handle clear individual product
  const handleClearProduct = (id: number) => {
    dispatch(
      setSelectedProducts(selectedProducts.filter(s => s !== id))
    );
    dispatch(setFiltersChanged(true));
  };

  return (
    <Card
      bg="white"
      shadow="lg"
      borderRadius="2xl"
      border="1px"
      borderColor="gray.100"
      overflow="hidden"
      transition="all 0.3s"
      w="full"
    >
      <CardBody p={{ base: 5, md: 6 }}>
        <VStack align="stretch" spacing={{ base: 4, md: 5 }}>
          {/* Header */}
          <Flex justify="space-between" align="center">
            <Box>
              <Heading 
                size={{ base: 'sm', md: 'md' }} 
                color="gray.800"
                fontWeight="700"
                mb={1}
              >
                Filters
              </Heading>
              <Text fontSize="xs" color="gray.500">
                Customize your view
              </Text>
            </Box>
            {hasActiveFilters && (
              <Badge
                colorScheme="blue"
                borderRadius="full"
                px={2}
                py={1}
                fontSize="xs"
              >
                {(selectedCategory ? 1 : 0) + selectedProducts.length} active
              </Badge>
            )}
          </Flex>

          <Divider />

          {/* Category Filter */}
          <Box>
            <Flex justify="space-between" align="center" mb={2}>
              <Text 
                fontSize="sm" 
                fontWeight="600" 
                color="gray.700"
              >
                Select Category
              </Text>
              {selectedCategory && (
                <IconButton
                  aria-label="clear-category"
                  icon={<CloseIcon />}
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  onClick={handleClearCategory}
                />
              )}
            </Flex>
            <Select
              placeholder="All categories"
              value={selectedCategory ?? ''}
              onChange={handleCategoryChange}
              size={{ base: 'md', md: 'md' }}
              borderRadius="lg"
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ 
                borderColor: 'blue.500', 
                boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' 
              }}
              bg="gray.50"
              transition="all 0.2s"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Box>

          {/* Products Filter */}
          <Box>
            <Flex justify="space-between" align="center" mb={2}>
              <Text 
                fontSize="sm" 
                fontWeight="600" 
                color="gray.700"
              >
                Select Products
              </Text>
              <Flex align="center" gap={2}>
                {selectedProducts.length > 0 && (
                  <>
                    <Badge 
                      colorScheme="purple" 
                      borderRadius="full"
                      fontSize="2xs"
                    >
                      {selectedProducts.length} selected
                    </Badge>
                    <IconButton
                      aria-label="clear-products"
                      icon={<CloseIcon />}
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => {
                        dispatch(setSelectedProducts([]));
                        dispatch(setFiltersChanged(true));
                      }}
                    />
                  </>
                )}
              </Flex>
            </Flex>
            
            {!selectedCategory ? (
              <Box
                p={4}
                bg="gray.50"
                borderRadius="lg"
                border="1px"
                borderColor="gray.200"
                textAlign="center"
              >
                <Text fontSize="sm" color="gray.500">
                  Select a category first
                </Text>
              </Box>
            ) : (
              <Box
                maxH={{ base: '200px', md: '250px' }}
                overflowY="auto"
                p={3}
                bg="gray.50"
                borderRadius="lg"
                border="1px"
                borderColor="gray.300"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#cbd5e0',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#a0aec0',
                  },
                }}
              >
                <CheckboxGroup
                  value={selectedProducts.map(String)}
                  onChange={handleProductsChange}
                >
                  <Stack spacing={2}>
                    {productOptions.map(p => (
                      <Checkbox 
                        key={p.id} 
                        value={String(p.id)}
                        colorScheme="purple"
                        size={{ base: 'sm', md: 'md' }}
                      >
                        <Text fontSize="sm">{p.title}</Text>
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Box>
            )}
          </Box>

          <Divider />

          {/* Action Buttons */}
          <VStack spacing={2} w="full">
            <Button 
              colorScheme="blue" 
              onClick={handleRun} 
              isDisabled={runDisabled}
              w="full"
              size={{ base: 'md', md: 'md' }}
              borderRadius="lg"
              fontWeight="600"
              boxShadow="sm"
              _hover={{ 
                transform: 'translateY(-1px)', 
                boxShadow: 'md' 
              }}
              transition="all 0.2s"
            >
              Run Report
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleClearAll}
              w="full"
              size={{ base: 'md', md: 'md' }}
              borderRadius="lg"
              fontWeight="600"
              color="gray.600"
              _hover={{ bg: 'gray.100' }}
            >
              Clear All Filters
            </Button>
          </VStack>

          {/* Selected Filters Tags */}
          {hasActiveFilters && (
            <>
              <Divider />
              <Box>
                <Text 
                  fontSize="xs" 
                  fontWeight="600" 
                  color="gray.600" 
                  mb={2}
                >
                  ACTIVE FILTERS
                </Text>
                <Flex gap={2} wrap="wrap">
                  {selectedCategory && (
                    <Tag
                      size={{ base: 'sm', md: 'md' }}
                      borderRadius="full"
                      colorScheme="blue"
                      variant="subtle"
                      py={1}
                      px={3}
                    >
                      <TagLabel fontWeight="500">{selectedCategory}</TagLabel>
                      <IconButton
                        aria-label="clear-category"
                        size="xs"
                        icon={<CloseIcon boxSize={2} />}
                        ml={2}
                        variant="ghost"
                        borderRadius="full"
                        minW="auto"
                        h="auto"
                        p={1}
                        _hover={{ bg: 'blue.200' }}
                        onClick={handleClearCategory}
                      />
                    </Tag>
                  )}

                  {selectedProducts.map(id => {
                    const p = productsData.find(pp => pp.id === id);
                    return (
                      <Tag
                        key={id}
                        size={{ base: 'sm', md: 'md' }}
                        borderRadius="full"
                        colorScheme="purple"
                        variant="subtle"
                        py={1}
                        px={3}
                      >
                        <TagLabel fontWeight="500">
                          {p?.title ?? id}
                        </TagLabel>
                        <IconButton
                          aria-label="clear-product"
                          size="xs"
                          icon={<CloseIcon boxSize={2} />}
                          ml={2}
                          variant="ghost"
                          borderRadius="full"
                          minW="auto"
                          h="auto"
                          p={1}
                          _hover={{ bg: 'purple.200' }}
                          onClick={() => handleClearProduct(id)}
                        />
                      </Tag>
                    );
                  })}
                </Flex>
              </Box>
            </>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}