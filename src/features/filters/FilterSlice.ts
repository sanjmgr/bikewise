import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PayloadProps, priorWeek } from '../../utils';

const initialState: PayloadProps = {
  from: priorWeek(),
  to: new Date().toISOString().split('T')[0],
  query: '',
  type: 'all',
  page: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    handleInputField(
      state,
      { payload: { from, to, query, type } }: PayloadAction<PayloadProps>
    ) {
      state.from = from;
      state.to = to;
      state.query = query;
      state.type = type;
    },
    handleFrom(state, { payload }: PayloadAction<string>) {
      state.from = payload;
    },
    handleTo(state, { payload }: PayloadAction<string>) {
      state.to = payload;
    },
    handleQuery(state, { payload }: PayloadAction<string>) {
      state.query = payload;
    },
    handleType(state, { payload }: PayloadAction<string>) {
      state.type = payload;
    },
  },
});

export const {
  handleInputField,
  handleFrom,
  handleTo,
  handleQuery,
  handleType,
} = filterSlice.actions;

export default filterSlice.reducer;
