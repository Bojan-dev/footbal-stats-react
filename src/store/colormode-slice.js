import { createSlice } from '@reduxjs/toolkit';

const colorModeSlice = createSlice({
  name: 'colormode',
  initialState: {
    colorModeWhite: true,
  },
  reducers: {
    toggle(state) {
      state.colorModeWhite = !state.colorModeWhite;
    },
  },
});

export const colorModeActions = colorModeSlice.actions;

export default colorModeSlice;
