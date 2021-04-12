import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    handlePage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
  },
});

export const { handlePage } = paginationSlice.actions;

export default paginationSlice.reducer;
