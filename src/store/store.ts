// config redux devtool + redux thunk
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers
} from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // store
import { loginReducer } from '../features/login/loginSlice';
import { i18nextReducer } from '../features/i18next/i18nextSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'i18next']
};

const rootReducer = combineReducers({
  login: loginReducer,
  i18next: i18nextReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
