import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import filterSlice from '../features/filters/FilterSlice';
import incidentsReducer from '../features/incidents/IncidentsSlice';
import incidentReducer from '../features/incident/IncidentSlice';
import paginationSlice from '../features/pagination/PaginationSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    incidents: incidentsReducer,
    incident: incidentReducer,
    pagination: paginationSlice,
    filter: filterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
