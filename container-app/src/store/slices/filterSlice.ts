import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  selectedCategory: string;
  selectedProducts: number[];
}

const initialState: FilterState = {
  selectedCategory: '',
  selectedProducts: [],
};

/**
 * Filter Slice
 * - Manages category and product selection state
 * - Products can only be selected after category selection
 */
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedProducts: (state, action: PayloadAction<number[]>) => {
      state.selectedProducts = action.payload;
    },
    clearCategory: state => {
      state.selectedCategory = '';
      state.selectedProducts = [];
    },
    clearProducts: state => {
      state.selectedProducts = [];
    },
    clearFilters: state => {
      state.selectedCategory = '';
      state.selectedProducts = [];
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedProducts,
  clearCategory,
  clearProducts,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
