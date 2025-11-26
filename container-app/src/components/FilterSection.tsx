// src/components/FilterSection.tsx
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Select,
  Tag,
  TagLabel,
  Text,
  VStack,
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

  // locally track run-disabled state (disabled immediately after running)
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
    dispatch(setSelectedProducts([])); // clear product selection on category change
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

  return (
    <VStack align="start" spacing={4}>
      <HStack spacing={4} w="full">
        <Box minW="220px">
          <Text mb={1}>Category</Text>
          <Select
            placeholder="Select category"
            value={selectedCategory ?? ''}
            onChange={handleCategoryChange}
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Box>

        <Box flex="1">
          <Text mb={1}>Products (multi-select)</Text>
          <Select
            placeholder="Select products (select a category first)"
            onChange={handleProductsChange}
            multiple
            isDisabled={!selectedCategory}
            size="md"
            height="40px"
          >
            {productOptions.map(p => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </Select>
        </Box>

        <Button colorScheme="blue" onClick={handleRun} isDisabled={runDisabled}>
          Run Report
        </Button>

        <Button variant="ghost" onClick={handleClearAll}>
          Clear All
        </Button>
      </HStack>

      <HStack spacing={2}>
        {selectedCategory && (
          <Tag>
            <TagLabel>{selectedCategory}</TagLabel>
            <IconButton
              aria-label="clear-category"
              size="xs"
              icon={<CloseIcon />}
              ml={2}
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
            <Tag key={id}>
              <TagLabel>{p?.title ?? id}</TagLabel>
              <IconButton
                aria-label="clear-product"
                size="xs"
                icon={<CloseIcon />}
                ml={2}
                onClick={() => {
                  dispatch(
                    setSelectedProducts(selectedProducts.filter(s => s !== id))
                  );
                  setJustRan(false);
                }}
              />
            </Tag>
          );
        })}
      </HStack>
    </VStack>
  );
}
