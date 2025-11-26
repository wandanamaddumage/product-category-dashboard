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
  HStack,
  Card,
  CardBody,
  Heading,
  Divider,
  Flex,
  Badge,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  categories,
  getProductsByCategory,
  Product,
  productsData,
} from '../../../const/productData';
import { AppDispatch, RootState } from '../store';
import {
  clearFilters,
  setSelectedCategory,
  setSelectedProducts,
} from '../store/slices/filterSlice';
import { runReport } from '../store/slices/reportSlice';

export default function FilterSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCategory, selectedProducts } = useSelector(
    (s: RootState) => s.filter
  );
  useSelector((s: RootState) => s.report);

  const [justRan, setJustRan] = useState(false);

  const productOptions = useMemo<Product[]>(
    () => (selectedCategory ? getProductsByCategory(selectedCategory) : []),
    [selectedCategory]
  );

  const runDisabled =
    (!selectedCategory && selectedProducts.length === 0) || justRan;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value || null;
    dispatch(setSelectedCategory(cat));
    dispatch(setSelectedProducts([]));
    setJustRan(false);
  };

  const handleProductsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map(o =>
      Number(o.value)
    );
    dispatch(setSelectedProducts(selected));
    setJustRan(false);
  };

  const handleRun = () => {
    dispatch(runReport());
    setJustRan(true);
  };

  const handleClearAll = () => {
    dispatch(clearFilters());
    setJustRan(false);
  };

  const hasActiveFilters = selectedCategory || selectedProducts.length > 0;

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
            <Text 
              fontSize="sm" 
              fontWeight="600" 
              color="gray.700" 
              mb={2}
            >
              Select Category
            </Text>
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
              {selectedProducts.length > 0 && (
                <Badge 
                  colorScheme="purple" 
                  borderRadius="full"
                  fontSize="2xs"
                >
                  {selectedProducts.length} selected
                </Badge>
              )}
            </Flex>
            <Select
              placeholder={
                selectedCategory 
                  ? "Choose products..." 
                  : "Select a category first"
              }
              value={selectedProducts.map(String)}
              onChange={handleProductsChange}
              multiple
              isDisabled={!selectedCategory}
              size="md"
              minH={{ base: '120px', md: '140px' }}
              borderRadius="lg"
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ 
                borderColor: 'blue.500', 
                boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' 
              }}
              bg="gray.50"
              transition="all 0.2s"
              sx={{
                option: {
                  padding: '8px 12px',
                  cursor: 'pointer',
                }
              }}
            >
              {productOptions.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </Select>
            <Text fontSize="2xs" color="gray.500" mt={1}>
              Hold Ctrl/Cmd to select multiple
            </Text>
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
                        onClick={() => {
                          dispatch(setSelectedCategory(null));
                          dispatch(setSelectedProducts([]));
                          setJustRan(false);
                        }}
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
                          onClick={() => {
                            dispatch(
                              setSelectedProducts(
                                selectedProducts.filter(s => s !== id)
                              )
                            );
                            setJustRan(false);
                          }}
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