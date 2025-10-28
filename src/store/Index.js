// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga/dist/redux-saga-core-npm-proxy.esm.js'; // ✅ ESM-safe
import { logger } from 'redux-logger';
import RootSaga from './rootSaga';
import AuthReducer from '../features/auth/authReducer';
import AppReducer from '../features/appScreens/appReducer'
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    App: AppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, logger),
});

sagaMiddleware.run(RootSaga);

export default store;
