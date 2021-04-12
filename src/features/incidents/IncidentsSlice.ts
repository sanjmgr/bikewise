import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { RootState } from '../../app/store';
import {
  ApiResponse,
  Incident,
  IncidentType,
  PayloadProps,
  toTimeStamp,
} from '../../utils';

const initialState: IncidentType = {
  status: 'idle',
  incidents: [],
  totalIncident: 0,
  message: '',
};

export const fetchIncidents = createAsyncThunk(
  'incidents/fetchIncidents',
  async ({ query = '', from, to, type, page = 1 }: PayloadProps) => {
    const url = '/incidents';
    const config: AxiosRequestConfig = {
      baseURL: 'https://bikewise.org:443/api/v2/',
      method: 'GET',
      params: {
        page,
        query,
        occurred_after: toTimeStamp(from),
        occurred_before: toTimeStamp(to),
        per_page: 10,
        incident_type: type !== 'all' ? type : null,
      },
    };

    const { data }: ApiResponse<IncidentType> = await axios.get<IncidentType>(
      url,
      config
    );
    return data.incidents;
  }
);

export const fetchAll = createAsyncThunk(
  'incidents/fetchAll',
  async ({ query = '', from, to, type, page = 1 }: PayloadProps) => {
    const url = '/incidents';
    const config: AxiosRequestConfig = {
      baseURL: 'https://bikewise.org:443/api/v2/',
      method: 'GET',
      params: {
        page,
        query,
        occurred_after: toTimeStamp(from),
        occurred_before: toTimeStamp(to),
        per_page: 1000,
        incident_type: type !== 'all' ? type : null,
      },
    };

    const { data }: ApiResponse<{ incidents: Incident[] }> = await axios.get<{
      incidents: Incident[];
    }>(url, config);
    return data.incidents.length;
  }
);

export const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIncidents.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchIncidents.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.incidents = payload;
      })
      .addCase(fetchIncidents.rejected, state => {
        state.status = 'failed';
      })
      .addCase(fetchAll.pending, state => {
        state.message = 'Fetching all incident...';
      })
      .addCase(fetchAll.fulfilled, (state, { payload }) => {
        state.message = 'Fetched';
        state.totalIncident = payload;
      })
      .addCase(fetchAll.rejected, state => {
        state.message = 'Failed to fetch all incident';
      });
  },
});

export const selectIncidents = (state: RootState) => state.incidents.incidents;
export const totalIncident = (state: RootState) =>
  state.incidents.totalIncident;

export default incidentsSlice.reducer;
