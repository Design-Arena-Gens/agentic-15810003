import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { products as seedProducts } from "@/data/products";
import type { Product } from "@/types";

interface ProductsState {
  items: Product[];
  selectedCategory?: string;
  searchQuery: string;
}

const initialState: ProductsState = {
  items: seedProducts,
  selectedCategory: undefined,
  searchQuery: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | undefined>) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addProduct: {
      reducer(state, action: PayloadAction<Product>) {
        state.items.unshift(action.payload);
      },
      prepare(product: Omit<Product, "id" | "rating" | "reviews">) {
        return {
          payload: {
            ...product,
            id: nanoid(),
            rating: 5,
            reviews: [],
          },
        };
      },
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  setCategory,
  setSearchQuery,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
