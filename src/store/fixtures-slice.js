import { createSlice } from '@reduxjs/toolkit';

const fixturesSlice = createSlice({
  name: 'fixtures',
  initialState: {
    fixtures: [],
  },
  reducers: {
    update(state) {},
  },
});

export const fixturesActions = fixturesSlice.actions;

export default fixturesSlice;
