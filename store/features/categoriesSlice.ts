import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces';

interface CategoriesState {
  categories: ICategory[];
}

const initialState: CategoriesState = {
  categories: [
    { id: 1, label: 'Personal', value: 'Personal' },
    { id: 2, label: 'Work', value: 'Work' },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload
      );
      if (index !== -1) {
        state.categories.splice(index, 1);
      }
    },
    updateCategory: (state, action: PayloadAction<ICategory>) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
