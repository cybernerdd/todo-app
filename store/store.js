import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import todoReducer from './features/todoSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const clearPersistedTodos = () => {
  persistStore(store).purge(['todos']);
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
