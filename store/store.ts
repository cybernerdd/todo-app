import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import todoReducer from './features/todoSlice';
import categoryReducer from './features/categoriesSlice';

export const clearPersistedData = () => {
  persistStore(store).purge();
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedTodoReducer = persistReducer(persistConfig, todoReducer);
const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);

const store = configureStore({
  reducer: {
    todos: persistedTodoReducer,
    categories: persistedCategoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
