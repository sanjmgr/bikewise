import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse, Incident } from '../../utils';

const initialState = {
  incident: {} as Incident,
  status: 'idle',
};

export const fetchIncident = createAsyncThunk(
  'incident/fetchIncident',
  async (payload: string) => {
    const url = `/incidents/${payload}`;
    const config: AxiosRequestConfig = {
      baseURL: 'https://bikewise.org:443/api/v2/',
      method: 'GET',
    };

    const { data }: ApiResponse<{ incident: Incident }> = await axios.get<{
      incident: Incident;
    }>(url, config);
    return data.incident;
  }
);

export const incidentSlice = createSlice({
  name: 'incident',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIncident.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchIncident.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.incident = payload;
      })
      .addCase(fetchIncident.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default incidentSlice.reducer;
