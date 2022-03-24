import { configureStore } from '@reduxjs/toolkit';

import colorModeSlice from './colormode-slice';
import fixturesSlice from './fixtures-slice';

const store = configureStore({
  reducer: {
    colorMode: colorModeSlice.reducer,
    fixtures: fixturesSlice.reducer,
  },
});

export default store;
