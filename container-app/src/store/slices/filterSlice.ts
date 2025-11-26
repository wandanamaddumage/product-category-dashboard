// src/store/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  selectedCategory: string | null;
  selectedProducts: number[]; // product ids
};

const initialState: FilterState = {
  selectedCategory: null,
  selectedProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
      if (!action.payload) {
        state.selectedProducts = [];
      }
    },
    setSelectedProducts(state, action: PayloadAction<number[]>) {
      state.selectedProducts = action.payload;
    },
    clearFilters(state) {
      state.selectedCategory = null;
      state.selectedProducts = [];
    },
  },
});

export const { setSelectedCategory, setSelectedProducts, clearFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
