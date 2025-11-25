import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import chartReducer from './slices/chartSlice';
import filterReducer from './slices/filterSlice';
import reportReducer from './slices/reportSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    filter: filterReducer,
    report: reportReducer,
    chart: chartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
